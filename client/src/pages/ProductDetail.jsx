import { Rating } from "@mui/material";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import ProductImage from "../components/Products/ProductImage";
import Review from "../components/Products/Review";
import SetColor from "../components/Products/SetColor";
import SetQuantity from "../components/Products/SetQuantity";
import CartContext from "../context/CartContext";

const Horizontal = () => {
    return <hr className="w-[30%]" />;
};

const ProductDetail = () => {
    const { cartList, setCartList } = useContext(CartContext);
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [cartProduct, setCartProduct] = useState({});

    useEffect(() => {
        try {
            setIsLoading(true);
            const getAProduct = async () => {
                const { data } = await axios.get(
                    `/api/v1/product/get-a-product/${id}`
                );
                setProduct(data.product);

                setCartProduct({
                    id: data.product?.id,
                    name: data.product?.name,
                    description: data.product?.description,
                    category: data.product?.category,
                    brand: data.product?.brand,
                    selectedImage:
                        data.product?.images?.length > 0
                            ? { ...data.product.images[0] }
                            : null,
                    quantity: 1,
                    price: data.product?.price,
                });
            };
            getAProduct();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const productRating =
        product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
        product?.reviews?.length;

    const handleColorSelect = useCallback((value) => {
        setCartProduct((prev) => ({ ...prev, selectedImage: value }));
    }, []);

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
    }, []);

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
    }, []);

    const alreadyInCart = cartList.some((product) => product.id == id);

    const addToCart = () => {
        if (alreadyInCart) {
            toast.error("This product is already in cart");
            return;
        }
        setCartList((prev) => [...prev, cartProduct]);
        localStorage.setItem(
            "cartListItems",
            JSON.stringify([...cartList, cartProduct])
        );
        toast.success("Product added to cart successfully");
    };

    return isLoading ? (
        <>
            <div>Loading</div>
        </>
    ) : (
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
                            ? product?.reviews?.length > 1
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
                {console.log("cart product is", cartProduct)}
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
                        onClick={() => addToCart()}
                    />
                </div>
            </div>
            <Review product={product} />
        </div>
    );
};

export default ProductDetail;
