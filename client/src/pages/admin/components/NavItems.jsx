import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavItems = ({ link, label, Icon }) => {
    const location = useLocation();

    return (
        <NavLink
            to={`/admin/${link}`}
            className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition-all duration-300 ${
                location.pathname === `/admin/${link}`
                    ? "border-b-slate-800 text-slate-800"
                    : "border-transparent text-slate-500"
            }`}
        >
            <Icon />
            <span className="font-medium text-sm text-center break-normal">
                {label}
            </span>
        </NavLink>
    );
};

export default NavItems;
