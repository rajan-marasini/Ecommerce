import React, { useContext } from "react";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import SearchContext from "../../context/SearchContext";
import UserMenu from "../UserMenu";

const Header = () => {
    const naviagate = useNavigate();
    const { cartList } = useContext(CartContext);
    const { search, setSearch } = useContext(SearchContext);

    return (
        <div className="sticky top-0 w-full z-30 shadow-sm max-w-7xl mx-auto">
            <div className="flex items-center justify-between ">
                <Link to={"/"} className="font-bold text-xl">
                    {" "}
                    E-shop
                </Link>

                <div className="flex-grow flex justify-center items-center">
                    <div className="w-full max-w-[24rem] px-4 py-2 rounded-lg  flex justify-center items-center bg-white">
                        <input
                            type="text"
                            className="w-full border-none outline-none bg-transparent"
                            placeholder="Search for a product "
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch size={24} />
                    </div>
                </div>

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
