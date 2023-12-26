import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import HomeBanner from "../components/Banner/HomeBanner";
import ProductCard from "../components/Products/ProductCard";
import SearchContext from "../context/SearchContext";

const Home = () => {
    const { search } = useContext(SearchContext);

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

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.brand.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-2 max-w-7xl mx-auto">
            <div>
                <HomeBanner />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts &&
                    filteredProducts.map((product, i) => (
                        <ProductCard product={product} key={i} />
                    ))}
            </div>
        </div>
    );
};

export default Home;
