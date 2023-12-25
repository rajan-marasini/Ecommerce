import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeBanner from "../components/Banner/HomeBanner";
import ProductCard from "../components/Products/ProductCard";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            const { data } = await axios.get(
                "/api/v1/product/get-all-products"
            );
            setProducts(data.products);
        };

        getAllProducts();
    }, []);

    return (
        <div className="p-2 max-w-7xl mx-auto">
            <div>
                <HomeBanner />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products &&
                    products.map((product, i) => (
                        <ProductCard product={product} key={i} />
                    ))}
            </div>
        </div>
    );
};

export default Home;
