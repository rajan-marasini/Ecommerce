import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import SetQuantity from "../Products/SetQuantity";

const ItemContent = ({ item }) => {
    const { cartList, setCartList } = useContext(CartContext);

    const handleQtyDecrease = () => {
        const updatedCartList = cartList.map((product) => {
            if (product.id === item?.id) {
                const updatedProduct = {
                    ...product,
                    quantity: Math.max(product.quantity - 1, 1),
                };
                // Update localStorage
                updateLocalStorage(updatedProduct);
                return updatedProduct;
            }
            return product;
        });

        setCartList(updatedCartList);
    };

    const handleQtyIncrease = () => {
        const updatedCartList = cartList.map((product) => {
            if (product.id === item?.id) {
                const updatedProduct = {
                    ...product,
                    quantity: product.quantity + 1,
                };
                // Update localStorage
                updateLocalStorage(updatedProduct);
                return updatedProduct;
            }
            return product;
        });

        setCartList(updatedCartList);
    };

    const updateLocalStorage = (updatedProduct) => {
        const updatedCartList = cartList.map((product) => {
            return product.id === updatedProduct.id ? updatedProduct : product;
        });

        // Update localStorage with the updated cartList
        localStorage.setItem("cartListItems", JSON.stringify(updatedCartList));
    };

    return (
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-2 border-slate-200 py-4 items-center px-2">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <Link to={`/product/${item?.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <img
                            src={item?.selectedImage?.image}
                            alt={item?.name}
                            className="object-contain"
                        />
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link to={`/product/${item.id}`}>
                        {item?.name?.length < 25
                            ? item?.name
                            : item?.name?.substring(0, 25)}
                    </Link>
                    <div>{item?.selectedImage?.color}</div>
                    <div className="w-[70px]">
                        <button
                            className=" text-slate-500 underline"
                            onClick={() => {
                                setCartList(
                                    cartList.filter(
                                        (product) => product.id !== item.id
                                    )
                                );
                            }}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <div className="justify-self-center">{formatPrice(item.price)}</div>
            <div className="justify-self-center">
                <SetQuantity
                    cartCounter={true}
                    cartProduct={item}
                    handleQtyDecrease={handleQtyDecrease}
                    handleQtyIncrease={handleQtyIncrease}
                />
            </div>
            <div className="justify-self-end font-semibold">
                {formatPrice(item.price * item.quantity)}
            </div>
        </div>
    );
};

export default ItemContent;
