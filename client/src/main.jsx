import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { SearchContextProvider } from "./context/SearchContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import "./index.css";

axios.defaults.baseURL = "https://ecommerce-hazel-chi.vercel.app";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <SearchContextProvider>
            <UserContextProvider>
                <CartContextProvider>
                    <BrowserRouter>
                        <App />
                        <Toaster />
                    </BrowserRouter>
                </CartContextProvider>
            </UserContextProvider>
        </SearchContextProvider>
    </React.StrictMode>
);
