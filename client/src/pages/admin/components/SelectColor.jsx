import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const SelectColor = ({
    item,
    selected,
    handleCheckboxClick,
    handleImageUpload,
    images,
}) => {
    return (
        <div className="grid grid-cols-1 overflow-y-auto border-2 border-slate-200 items-center p-2">
            <label className="inline-flex flex-row gap-2 items-center min-h-[40px] cursor-pointer">
                <input type="checkbox" onChange={() => handleCheckboxClick()} />
                {item.color}
            </label>
            {selected && (
                <>
                    <label className="flex items-center justify-center border-2 border-dotted gap-2 py-2 cursor-pointer">
                        <input
                            type="file"
                            hidden
                            onChange={(e) => handleImageUpload(e, item.color)}
                            accept="image/*"
                        />
                        <AiOutlinePlus size={18} />
                        <span>Add photo</span>
                    </label>
                    {images
                        .filter((img) => img.color === item.color)
                        .map((img, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center"
                            >
                                {img.image && (
                                    <>
                                        <img
                                            src={img.image}
                                            alt={`No image available`}
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                </>
            )}
        </div>
    );
};

export default SelectColor;
