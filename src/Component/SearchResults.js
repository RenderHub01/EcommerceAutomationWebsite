import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const SearchResults = ({ product, onAddToCart }) => {
  const searchResultsRef = useRef(null);

  const [data, setData] = useState({ products: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:10000/get_products")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (!product) {
    return (
      <div ref={searchResultsRef} className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            All Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {data.products && data.products.map((item) => (
              <ProductCard
                key={item._id}
                image={item.main_image}
                name={item.title}
                price={item.numerical_price}
                description={"No description available"}
                onAddToCart={() => onAddToCart(item)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={searchResultsRef} className="w-full bg-gray-50 py-16 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Search Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <ProductCard
            key={product.id}
            image={product.main_image}
            name={product.title}
            price={product.price}
            description={"No description available"}
            onAddToCart={() => onAddToCart(product)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
