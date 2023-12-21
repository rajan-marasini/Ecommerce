import React from "react";
import {
    MdDashboard,
    MdDns,
    MdFormatListBulleted,
    MdLibraryAdd,
} from "react-icons/md";
import { Outlet } from "react-router-dom";
import NavItems from "./components/NavItems";

const AdminPage = () => {
    return (
        <div className="h-full w-full mx-auto">
            <nav className="w-full mt-2 md:justify-between gap-8 md:gap-12 border-b-2 shadow-md py-2 px-6">
                <div className="flex items-center justify-center gap-8 md:gap-12 max-w-7xl mx-auto flex-nowraps">
                    <NavItems
                        link="dashboard"
                        label={"Summary"}
                        Icon={MdDashboard}
                    />

                    <NavItems
                        link="add-product"
                        label={"AddProduct"}
                        Icon={MdLibraryAdd}
                    />
                    <NavItems
                        link="manage-products"
                        label={"ManageProducts"}
                        Icon={MdDns}
                    />
                    <NavItems
                        link="manage-orders"
                        label={"ManageOrders"}
                        Icon={MdFormatListBulleted}
                    />
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default AdminPage;
