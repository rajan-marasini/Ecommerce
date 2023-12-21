import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const AdminAuth = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (user.role !== "Admin") {
        setTimeout(() => {
            navigate("/");
        }, 300);
    }

    return user.role === "Admin" ? (
        <>
            <Outlet />
        </>
    ) : (
        <div className="h-full flex justify-center items-center">
            <h1 className="text-5xl text-rose-800 font-bold">
                UnAuthorized Access
            </h1>
        </div>
    );
};

export default AdminAuth;
