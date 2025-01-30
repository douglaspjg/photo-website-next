"use client";

import images from "@/portfolio-images.json";
import { useState } from "react";

const Carousel: React.FC = () => {
    // index of current image
    const [imageindex, setImageindex] = useState(0);
    const imagesLen = images.images.length;
    const [imgDesc, setImgDesc] = useState(`1/${imagesLen}`);

    // want to change the displayed image every time a button is clicked

    const handleClick = (offset: number) => {
        // Handle click event with parameters
        let newIndex: number = imageindex + offset;
        console.log(images.images[imageindex].path);
        newIndex = newIndex < 0 ? images.images.length - 1 : newIndex;
        newIndex = newIndex >= images.images.length ? 0 : newIndex;
        setImageindex(newIndex);
        const indexDisplay = newIndex + 1;
        const fullIndexDisplay = `${indexDisplay.toString()}/${
            images.images.length
        }`;
        setImgDesc(fullIndexDisplay);
    };

    return (
        <div
            id="carousel"
            className="flex justify-between px-8 max-h-[550px] max-w-[1440px] w-auto flex-1 mt-16"
        >
            <button
                id="previous-button"
                onClick={() => handleClick(-1)}
                className="mr-2 text-xl p-12 anim"
            >
                &#10094;
            </button>
            <div
                id="image-and-description"
                className="h-[550px] max-h-[550px] justify-center items-center flex"
            >
                <div className="flex flex-col justify-center items-center">
                    <img
                        src={images.images[imageindex].path}
                        // fill={true}
                        // objectFit="contain"
                        alt=""
                        className="h-full w-auto block object-contain self-center max-h-[550px]"
                    />
                    <p
                        id="description"
                        className="text-center p-2 text-sm  self-center font-satoshi font-normal"
                    >
                        {imgDesc}
                    </p>
                </div>
            </div>
            <button
                id="next-button"
                onClick={() => handleClick(1)}
                className="ml-2 text-xl w-auto p-12 anim"
            >
                &#10095;
            </button>
        </div>
    );
};

export default Carousel;
