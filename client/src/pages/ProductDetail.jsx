import { Rating } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import ProductImage from "../components/Products/ProductImage";
import Review from "../components/Products/Review";
import SetColor from "../components/Products/SetColor";
import SetQuantity from "../components/Products/SetQuantity";
import CartContext from "../context/CartContext";
import { product } from "../utils/product";

const Horizontal = () => {
    return <hr className="w-[30%]" />;
};

const ProductDetail = () => {
    const { cartList, setCartList } = useContext(CartContext);
    const { id } = useParams();

    const productRating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

    const [cartProduct, setCartProduct] = useState({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImage: { ...product.images[0] },
        quantity: 1,
        price: product.price,
    });

    const handleColorSelect = useCallback(
        (value) => {
            setCartProduct((prev) => ({ ...prev, selectedImage: value }));
        },
        [cartProduct]
    );

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct?.quantity === 1) {
            return;
        }
        setCartProduct((prev) => {
            return {
                ...prev,
                quantity: prev.quantity - 1,
            };
        });
    }, [cartProduct]);

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct?.quantity === 99) {
            return;
        }

        setCartProduct((prev) => {
            return {
                ...prev,
                quantity: prev.quantity + 1,
            };
        });
    }, [cartProduct]);

    const alreadyInCart = cartList.some((product) => product.id == id);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 max-w-7xl mx-auto">
            <ProductImage
                cartProduct={cartProduct}
                product={product}
                handleColorsSelect={handleColorSelect}
            />
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">
                    {product?.name}
                </h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly />
                    <div>
                        {product?.reviews?.length > 0
                            ? product.reviews.length > 1
                                ? product?.reviews?.length + " reviews"
                                : product?.reviews?.length + " review"
                            : ""}
                    </div>
                </div>
                <Horizontal />
                <div className="text-justify">{product?.description}</div>
                <Horizontal />

                <div>
                    <span className="font-bold">CATEGORY: </span>
                    {product?.category}
                </div>
                <div>
                    <span className="font-bold">BRAND: </span>
                    {product?.brand}
                </div>
                <div
                    className={
                        product?.inStock ? "text-teal-400" : "text-rose-500"
                    }
                >
                    {product?.inStock ? "In stock" : "Out of stock "}
                </div>

                <Horizontal />
                <SetColor
                    cartProduct={cartProduct}
                    images={product?.images}
                    handleColorSelect={handleColorSelect}
                />
                <Horizontal />
                <SetQuantity
                    cartCounter={true}
                    cartProduct={cartProduct}
                    handleQtyIncrease={handleQtyIncrease}
                    handleQtyDecrease={handleQtyDecrease}
                />
                <Horizontal />
                <div className="max-w-[300px]">
                    <Button
                        disabled={!product?.inStock}
                        label={
                            alreadyInCart
                                ? "This Product is already in cart"
                                : "Add to cart"
                        }
                        onClick={() => {
                            if (
                                !cartList.some(
                                    (item) => item.id === cartProduct.id
                                )
                            ) {
                                setCartList((prev) => [...prev, cartProduct]);
                                localStorage.setItem(
                                    "cartListItems",
                                    JSON.stringify([...cartList, cartProduct])
                                );
                                toast.success(
                                    "Product added to cart successfully"
                                );
                            } else {
                                toast.error("Product is already in the cart");
                            }
                        }}
                    />
                </div>
            </div>
            <Review product={product} />
        </div>
    );
};

export default ProductDetail;
