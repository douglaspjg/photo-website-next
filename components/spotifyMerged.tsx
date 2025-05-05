"use client";
import { useEffect, useState, useRef } from "react";

const SpotifyMerged = () => {
    const [song, setSong] = useState<string>("Loading...");
    const [latestTimestamp, setLatestTimestamp] = useState(0);
    const hasRun = useRef(false);

    const clientId = "c74683c3adda453ca92ae6fa5575648c";
    const redirectUri = "https://www.douglaspg.com";

    useEffect(() => {
        console.log("useEffect ran");
        if (hasRun.current) return;
        hasRun.current = true;

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
            params.append(
                "scope",
                "user-read-recently-played user-read-currently-playing"
            );
            params.append("code_challenge_method", "S256");
            params.append("code_challenge", challenge);

            window.location.href = `https://accounts.spotify.com/authorize?${params}`;
        }

        async function getAccessToken(
            clientId: string,
            code: string
        ): Promise<string> {
            console.log("Getting access token ... \n");
            const verifier = localStorage.getItem("verifier");
            if (!verifier) {
                throw new Error("No verifier found in localStorage");
            } else {
                console.log("Retrieved verifier:", verifier);
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
            if (data.refresh_token && !localStorage.getItem("refresh_token")) {
                localStorage.setItem("refresh_token", data.refresh_token);
            }

            return data.access_token;
        }

        async function refreshAccessToken(clientId: string) {
            console.log("Refreshing access token ...");
            const refreshToken = localStorage.getItem("refresh_token");

            if (!refreshToken) {
                console.warn(
                    "No refresh token available, redirecting to login."
                );
                await redirectToAuthCodeFlow(clientId);
                return;
            }

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

                if (err.error === "invalid_grant") {
                    console.warn(
                        "Refresh token revoked, redirecting to login..."
                    );
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("access_token");
                    await redirectToAuthCodeFlow(clientId);
                }

                throw new Error("Failed to refresh token");
            }

            const data = await response.json();
            console.log("Refreshed access token:", data.access_token);
            localStorage.setItem("access_token", data.access_token);
            return data.access_token;
        }

        async function fetchCurrentlyPlaying(token: string) {
            console.log("Fetching currently playing track ...");
            const res = await fetch(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.status === 204) {
                console.log("No song currently playing");
                return null;
            }
            if (!res.ok) {
                console.error(
                    "Failed to fetch currently playing track:",
                    res.status
                );
                return null;
            }

            const data = await res.json();
            return data?.item
                ? `Now Playing: ${data.item.name} by ${data.item.artists
                      .map((a: any) => a.name)
                      .join(", ")}`
                : null;
        }

        async function fetchRecentlyPlayed(token: string) {
            console.log("Fetching most recently played track ...");
            const params = new URLSearchParams();
            params.append("limit", "1");
            if (latestTimestamp > 0)
                params.append("after", latestTimestamp.toString());

            const res = await fetch(
                `https://api.spotify.com/v1/me/player/recently-played?${params}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!res.ok) {
                console.error(
                    "Failed to fetch most recently played track:",
                    res.status
                );
                return "Could not fetch recent track";
            }

            const data = await res.json();
            const item = data.items?.[0];
            if (!item) {
                console.log("No recent track found");
                return "No recent track found";
            } else {
                console.log("Most Recently Played:", item);
            }

            const timestamp = new Date(item.played_at).getTime();
            setLatestTimestamp(timestamp + 1);

            return `Most Recently Played: ${
                item.track.name
            } by ${item.track.artists.map((a: any) => a.name).join(", ")}`;
        }

        async function runAuthFlow() {
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n Run Auth Flow \n");
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");

            try {
                let storedToken = localStorage.getItem("access_token");
                if (storedToken) {
                    console.log("Trying stored token ...");
                    const playing = await fetchCurrentlyPlaying(storedToken);
                    if (playing) {
                        setSong(playing);
                    } else {
                        const fallback = await fetchRecentlyPlayed(storedToken);
                        setSong(fallback);
                    }
                } else if (code) {
                    try {
                        const accessToken = await getAccessToken(
                            clientId,
                            code
                        );
                        console.log("Access token:", accessToken);
                        const playing = await fetchCurrentlyPlaying(
                            accessToken
                        );
                        if (playing) {
                            setSong(playing);
                        } else {
                            const fallback = await fetchRecentlyPlayed(
                                accessToken
                            );
                            setSong(fallback);
                        }
                        window.history.replaceState({}, document.title, "/"); // Clean URL
                    } catch (error) {
                        console.error("Error in auth flow:", error);
                        setSong("Error fetching song data");
                    }
                } else {
                    await redirectToAuthCodeFlow(clientId);
                    return;
                }

                console.log("Trying refresh flow...");
                const newToken = await refreshAccessToken(clientId);
                const success = await fetchRecentlyPlayed(newToken);
                if (success) return;
            } catch (e) {
                console.error("Token reuse/refresh failed:", e);
            }
        }

        runAuthFlow();
    }, []);

    return <div className="text-second-grey text-center">{song}</div>;
};

export default SpotifyMerged;
