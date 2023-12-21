import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-full mt-12">
                <h1 className=" text-8xl font-medium mb-4">404</h1>
                <h1 className="font-semibold text-3xl">
                    Oops! The Page You Are Looking For Not Found
                </h1>
                <Link to="/" className="text-blue-500 underline">
                    Back to home
                </Link>
            </div>
        </>
    );
};

export default NotFound;
