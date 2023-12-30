import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import AdminAuth from "./pages/admin/AdminAuth";
import AdminPage from "./pages/admin/AdminPage";
import AddProducts from "./pages/admin/pages/AddProducts";
import AdminDashboard from "./pages/admin/pages/AdminDashboard";
import ManageOrders from "./pages/admin/pages/ManageOrders";
import ManageProducts from "./pages/admin/pages/ManageProducts";

const App = () => {
    //this is app
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<AdminAuth />}>
                    <Route path="/admin" element={<AdminPage />}>
                        <Route
                            path={"dashboard"}
                            element={<AdminDashboard />}
                        />
                        <Route path={"add-product"} element={<AddProducts />} />

                        <Route
                            path="manage-products"
                            element={<ManageProducts />}
                        />
                        <Route
                            path="manage-orders"
                            element={<ManageOrders />}
                        />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
