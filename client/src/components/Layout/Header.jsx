import React, { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import UserMenu from "../UserMenu";

const Header = () => {
    const naviagate = useNavigate();
    const { cartList } = useContext(CartContext);

    return (
        <div className="sticky top-0 w-full z-30 shadow-sm max-w-7xl mx-auto">
            <div className="flex items-center justify-between ">
                <Link to={"/"} className="font-bold text-xl">
                    {" "}
                    E-shop
                </Link>

                <div>Search</div>

                <div className="flex items-center gap-8 md:gap-12">
                    <div
                        className="flex justify-center items-center relative cursor-pointer"
                        onClick={() => naviagate("/cart")}
                    >
                        <FaCartPlus size={30} />
                        <span className="absolute -right-3 -top-2 bg-rose-600 rounded-full px-1 font-bold text-white">
                            {cartList?.length ? cartList?.length : "0"}
                        </span>
                    </div>
                    <div className="cursor-pointer">
                        <UserMenu />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
