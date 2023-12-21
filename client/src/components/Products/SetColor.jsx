import React from "react";

const SetColor = ({ images, cartProduct, handleColorSelect }) => {
    return (
        <div className="flex gap-3 items-center">
            <span className="font-bold">COLOR:</span>
            <div className="flex gap-2">
                {images.map((image) => (
                    <div
                        key={image.color}
                        onClick={() => handleColorSelect(image)}
                        className={`h-7 w-7 rounded-full border-teal-300
                        flex items-center justify-center
                        ${
                            cartProduct?.selectedImage?.color == image.color
                                ? "border-2"
                                : "border-none"
                        } 
                        `}
                    >
                        <div
                            style={{
                                background: image.colorCode,
                            }}
                            className="h-5 w-5 rounded-full border-2 border-slate-300 cursor-pointer"
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SetColor;
