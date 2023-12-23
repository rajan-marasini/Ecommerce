import { Rating } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const productRating =
        product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
        product?.reviews?.length;

    return (
        <div
            onClick={() => navigate(`/product/${product.id}`)}
            className="col-span-1 cursor-pointer border-2 border-slate-200 bg-slate-50 rounded-sm p-2 transition duration-300 hover:scale-105 text-center text-sm"
        >
            <div className="flex flex-col items-center w-full gap-1">
                <div className="aspect-square overflow-hidden relative w-full">
                    <img
                        src={product?.images[0].image}
                        alt={product?.name}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="mt-4 ">
                    {product?.name.length < 25
                        ? product?.name
                        : product?.name.substring(0, 25) + "...."}
                </div>
                <div>
                    <Rating value={productRating} readOnly />
                </div>
                <div>
                    {product?.reviews?.length > 0
                        ? product?.reviews?.length > 1
                            ? product?.reviews?.length + " reviews"
                            : product?.reviews?.length + " review"
                        : ""}
                </div>
                <div>{formatPrice(product?.price)}</div>
            </div>
        </div>
    );
};

export default ProductCard;
