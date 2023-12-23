import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import ItemContent from "../components/CartComponents/ItemContent";
import CartContext from "../context/CartContext";
import UserContext from "../context/UserContext";
import { formatPrice } from "../utils/formatPrice";

const CartPage = () => {
    const { cartList, setCartList } = useContext(CartContext);
    const { user } = useContext(UserContext);

    const products = cartList.map((product) => product?.id);

    const totalSum = () => {
        let total = 0;

        cartList.forEach((item) => {
            let subTotal = item.price * item.quantity;
            total += subTotal;
        });

        return total;
    };

    const handleCheckout = async (e) => {
        try {
            if (!user?.name) {
                toast.error("You need to login to checkout");
                console.log(products);
                return;
            }

            const { data } = await axios.post(`/api/v1/user/order/create`, {
                amount: totalSum(),
                products,
            });
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong, Try again later");
        }
    };

    return (
        <div className="w-full h-full max-w-7xl mx-auto">
            {cartList?.length ? (
                <>
                    <h1 className="font-bold text-3xl text-center">
                        Welcome to the cartPage
                    </h1>
                    <div className="grid grid-cols-5 text-base gap-4 pb-2 items-center border-b mt-8 px-2">
                        <div className="col-span-2 justify-self-start">
                            PRODUCT
                        </div>
                        <div className="justify-self-center">PRICE</div>
                        <div className="justify-self-center">QUANTITY</div>
                        <div className="justify-self-end">TOTAL</div>
                    </div>
                    <div>
                        {cartList &&
                            cartList?.map((item) => (
                                <ItemContent key={item.id} item={item} />
                            ))}
                    </div>
                    <div className=" border-t-2 border-slate-200 py-4 flex justify-between gap-4">
                        <div className="w-[100px]">
                            <Button
                                small
                                outline
                                label="Clear Cart"
                                onClick={() => {
                                    localStorage.clear("cartListItems");
                                    [];
                                    setCartList([]);
                                }}
                            />
                        </div>
                        <div className="text-sm flex flex-col gap-1 items-start">
                            <div>
                                <div className="flex justify-between w-full text-base font-bold">
                                    <span>Total</span>
                                    <span>{formatPrice(totalSum())}</span>
                                </div>
                                <p className="text-slate-500">
                                    Taxes and shipping calculate at checkout
                                </p>
                                <Button
                                    label={"Checkout"}
                                    onClick={(e) => {
                                        handleCheckout(e);
                                    }}
                                />
                                <Link
                                    to={"/"}
                                    className="text-slate-500 flex items-center gap-1 mt-4"
                                >
                                    <MdArrowBack />
                                    <span>Continue Shopping</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="h-full flex flex-col items-center justify-center gap-8">
                    <h1 className="font-bold text-3xl">Your cart is empty</h1>
                    <Link to="/" className="max-w-[300px]">
                        <Button label="Shop Now" />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;
