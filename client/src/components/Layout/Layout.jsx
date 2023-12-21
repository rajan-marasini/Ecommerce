import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="w-full bg-slate-300 px-6 py-4 sticky top-0 z-30">
                <Header />
            </div>
            <main className=" w-full flex-1 mx-auto">
                <Outlet />
            </main>
            <div className="w-full bg-slate-700 text-slate-200 text-sm mt-16">
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
