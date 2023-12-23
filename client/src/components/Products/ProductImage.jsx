import React from "react";

const ProductImage = ({ cartProduct, product, handleColorsSelect }) => {
    return (
        <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
            <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
                {product?.images?.map((image) => (
                    <div
                        key={image?.color}
                        onClick={() => handleColorsSelect(image)}
                        className={`relative w-4/5 aspect-square rounded border-teal-300
                        ${
                            cartProduct?.selectedImage?.color === image.color
                                ? "border-2"
                                : "border-none"
                        }
                        `}
                    >
                        <img
                            src={image?.image}
                            alt={image?.color}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>

            <div className="col-span-5 relative aspect-square">
                <img
                    src={cartProduct?.selectedImage?.image}
                    alt={product?.name}
                    className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
                />
            </div>
        </div>
    );
};

export default ProductImage;
