import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProductList.css"; // CSS dosyasını burada import edin

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [horizontalProducts, setHorizontalProducts] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Seçilen ürünü getirme
    fetch(
      "https://mocki.io/v1/1a1fb542-22d1-4919-914a-750114879775?code={code}"
    )
      .then((response) => response.json())
      .then((data) => {
        setSelectedProduct(data.result);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    // Ürün listesini getirme
    fetch("https://mocki.io/v1/59906f35-d5d5-40f7-8d44-53fd26eb3a05")
      .then((response) => response.json())
      .then((data) => {
        const { horizontalProducts, products, result } = data.result;
        setHorizontalProducts(horizontalProducts || []);
        setProducts(products || []);
        setNextUrl(result.nextUrl);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const handleSelectedProductClick = () => {
    if (selectedProduct) {
      navigate(`/product/${selectedProduct.code}`);
    }
  };

  return (
    <div className="container">
      {selectedProduct && (
        <div className="selected-product" onClick={handleSelectedProductClick}>
          <h2>Selected Product</h2>
          <img
            src={selectedProduct.imageUrl}
            alt={selectedProduct.productName}
          />
          <h3>{selectedProduct.productName}</h3>
          <p>{selectedProduct.badge}</p>
          <p>Rating: {selectedProduct.rating}</p>
          <p>Price: {selectedProduct.price}</p>
          <p>Storage Options: {selectedProduct.storageOptions.join(", ")}</p>
          <p>Count of Prices: {selectedProduct.countOfPrices}</p>
          <p>Free Shipping: {selectedProduct.freeShipping ? "Yes" : "No"}</p>
          <p>Last Update: {selectedProduct.lastUpdate}</p>
        </div>
      )}

      <h2>Product List</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.code}>
            <Link to={`/product/${product.code}`}>
              <img src={product.imageUrl} alt={product.name} />
              {product.name}
            </Link>
          </li>
        ))}
      </ul>

      <h2>Horizontal Product List</h2>
      <ul className="product-list">
        {horizontalProducts.map((product) => (
          <li key={product.code}>
            <Link to={`/product/${product.code}`}>
              <img src={product.imageUrl} alt={product.name} />
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
