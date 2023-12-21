import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cartListItems");

        const parsedCart = storedCart ? JSON.parse(storedCart) : [];

        setCartList(parsedCart);
    }, []);

    return (
        <CartContext.Provider value={{ cartList, setCartList }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
