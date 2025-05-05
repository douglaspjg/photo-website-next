"use client";
import { useEffect, useState } from "react";
import { useRef } from "react";

const Spotify = () => {
    const [song, setSong] = useState<string>("");

    const clientId = "c74683c3adda453ca92ae6fa5575648c";
    const redirectUri = "http://127.0.0.1:3000";
    const hasRun = useRef(false);

    useEffect(() => {
        console.log("useEffect ran");
        if (hasRun.current) return;
        hasRun.current = true;

        function generateCodeVerifier(length: number) {
            console.log("Generating Verifier ...\n");
            const possible =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const yuh = Array.from({ length }, () =>
                possible.charAt(Math.floor(Math.random() * possible.length))
            ).join("");
            console.log("from generate verifier function: ");
            console.log(yuh);
            console.log("\n");
            return yuh;
        }

        async function generateCodeChallenge(codeVerifier: string) {
            console.log("Generating Challenge ...\n");
            const encoder = new TextEncoder();
            console.log("1");
            const data = encoder.encode(codeVerifier);
            console.log("2");
            const digest = await window.crypto.subtle.digest("SHA-256", data);
            console.log("3");
            const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)));
            console.log("4");
            return base64
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");
        }

        async function redirectToAuthCodeFlow(clientId: string) {
            console.log("Redirect To AuthCodeFlow \n");
            const verifier = generateCodeVerifier(128);
            const challenge = await generateCodeChallenge(verifier);

            console.log("Generated verifier: ", verifier, "\n");
            localStorage.setItem("verifier", verifier);
            console.log("Verifier should now be in localStorage\n");
            console.log("Stored verifier:", localStorage.getItem("verifier"));

            const params = new URLSearchParams();
            params.append("client_id", clientId);
            params.append("response_type", "code");
            params.append("redirect_uri", redirectUri);
            params.append("scope", "user-read-currently-playing");
            params.append("code_challenge_method", "S256");
            params.append("code_challenge", challenge);

            window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
        }

        async function getAccessToken(
            clientId: string,
            code: string
        ): Promise<string> {
            console.log("Getting access token ... \n");
            const verifier = localStorage.getItem("verifier");
            console.log("Retrieved verifier:", verifier);

            if (!verifier) {
                throw new Error("No verifier found in localStorage");
            }

            const params = new URLSearchParams();
            params.append("client_id", clientId);
            params.append("grant_type", "authorization_code");
            params.append("code", code);
            params.append("redirect_uri", redirectUri);
            params.append("code_verifier", verifier);

            const response = await fetch(
                "https://accounts.spotify.com/api/token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: params,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Token fetch error:", errorData);
                throw new Error(
                    errorData.error_description || "Failed to get access token"
                );
            }

            const data = await response.json();
            console.log("Received token data:", data);
            localStorage.setItem("access_token", data.access_token);
            if (data.refresh_token)
                localStorage.setItem("refresh_token", data.refresh_token);
            return data.access_token;
        }

        async function refreshAccessToken(clientId: string): Promise<string> {
            console.log("Refreshing access token ...");
            const refreshToken = localStorage.getItem("refresh_token");
            if (!refreshToken) throw new Error("No refresh token available");

            const params = new URLSearchParams();
            params.append("client_id", clientId);
            params.append("grant_type", "refresh_token");
            params.append("refresh_token", refreshToken);

            const response = await fetch(
                "https://accounts.spotify.com/api/token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: params,
                }
            );

            if (!response.ok) {
                const err = await response.json();
                console.error("Failed to refresh token", err);
                throw new Error("Failed to refresh token");
            }

            const data = await response.json();
            console.log("Refreshed access token:", data.access_token);
            localStorage.setItem("access_token", data.access_token);
            return data.access_token;
        }

        async function fetchCurrentlyPlaying(
            accessToken: string
        ): Promise<boolean> {
            console.log("Fetching currently playing track ...");
            const response = await fetch(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            if (response.status === 204) {
                setSong("No song currently playing");
                return true;
            }

            if (!response.ok) {
                console.error(
                    "Failed to fetch currently playing track:",
                    response.status
                );
                return false;
            }

            const data = await response.json();
            console.log("Currently playing:", data);
            if (data?.item?.name) {
                setSong(
                    `Now Playing: ${data.item.name} by ${data.item.artists
                        .map((a: any) => a.name)
                        .join(", ")}`
                );
            } else {
                setSong("No song currently playing");
            }
            return true;
        }

        async function runAuthFlow() {
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n Run Auth Flow \n");
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");

            try {
                const storedToken = localStorage.getItem("access_token");
                if (storedToken) {
                    console.log("Trying stored token ...");
                    const success = await fetchCurrentlyPlaying(storedToken);
                    if (success) return;
                }

                console.log("Trying refresh flow...");
                const newToken = await refreshAccessToken(clientId);
                const success = await fetchCurrentlyPlaying(newToken);
                if (success) return;
            } catch (e) {
                console.error("Token reuse/refresh failed:", e);
            }

            if (!code) {
                await redirectToAuthCodeFlow(clientId);
            } else {
                console.log("Now in the else\n\n");
                try {
                    const accessToken = await getAccessToken(clientId, code);
                    console.log("Access token:", accessToken);
                    await fetchCurrentlyPlaying(accessToken);
                    window.history.replaceState({}, document.title, "/"); // Clean URL
                } catch (error) {
                    console.error("Error in auth flow:", error);
                    setSong("Error fetching song data");
                }
            }
        }

        runAuthFlow();
    }, []);

    return (
        <div className="text-second-grey text-center">
            {song || "Loading..."}
        </div>
    );
};

export default Spotify;
