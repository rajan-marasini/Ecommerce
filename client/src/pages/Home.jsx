import React from "react";
import HomeBanner from "../components/Banner/HomeBanner";
import ProductCard from "../components/Products/ProductCard";
import { products } from "../utils/products";

const Home = () => {
    return (
        <div className="p-2 max-w-7xl mx-auto">
            <div>
                <HomeBanner />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products &&
                    products.map((product, i) => (
                        <ProductCard product={product} key={i} />
                    ))}
            </div>
        </div>
    );
};

export default Home;
