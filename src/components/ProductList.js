import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [horizontalProducts, setHorizontalProducts] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mocki.io/v1/1a1fb542-22d1-4919-914a-750114879775?code={code}"
        );
        const data = await response.json();
        setSelectedProduct(data.result);

        const productListResponse = await fetch(
          "https://mocki.io/v1/59906f35-d5d5-40f7-8d44-53fd26eb3a05"
        );
        const productListData = await productListResponse.json();
        const { horizontalProducts, products, result } = productListData.result;
        setHorizontalProducts(horizontalProducts || []);
        setProducts(products || []);
        setNextUrl(result.nextUrl);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectedProductClick = (productCode) => {
    if (productCode === products[0]?.code) {
      navigate(`/product/${productCode}`);
    }
  };

  const handleCarouselDotClick = (index) => {
    setCarouselIndex(index);
  };

  const loadMoreProducts = async () => {
    if (nextUrl) {
      try {
        const response = await fetch(nextUrl);
        const data = await response.json();
        const { products: newProducts, result } = data.result;
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setNextUrl(result.nextUrl);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  return (
    <div className="container">
      {selectedProduct && (
        <div className="selected-product">
          <div className="carousel-container">
            <div className="item">
              <div className="carousel-slide">
                {horizontalProducts.length > 0 && (
                  <img
                    src={horizontalProducts[carouselIndex]?.imageUrl}
                    alt={horizontalProducts[carouselIndex]?.name}
                    className="carousel-image"
                    onClick={() =>
                      handleSelectedProductClick(
                        horizontalProducts[carouselIndex]?.code
                      )
                    }
                  />
                )}
              </div>

              <div className="product">
                <h3 className="product-name">
                  {horizontalProducts[carouselIndex]?.name}
                </h3>
                <p>{horizontalProducts[carouselIndex]?.badge}</p>
                <p className="product-rating">
                  Rating: {horizontalProducts[carouselIndex]?.rating}
                </p>
                <p className="product-price">
                  {horizontalProducts[carouselIndex]?.price}.00 {""}
                  <span>TL</span>
                </p>
                <p className="storage">
                  Storage Options:{" "}
                  {horizontalProducts[carouselIndex]?.storageOptions?.join(
                    ", "
                  )}
                </p>
                <p className="seller-number">
                  {horizontalProducts[carouselIndex]?.countOfPrices} {""}{" "}
                  <span>Satıcı </span>
                </p>
                <p className="shipping-status">
                  Ücretsiz Kargo:{" "}
                  {horizontalProducts[carouselIndex]?.freeShipping
                    ? "Evet"
                    : "Hayır"}
                </p>
                <p className="product-update">
                  Son Güncelleme:{" "}
                  {horizontalProducts[carouselIndex]?.lastUpdate}
                </p>
              </div>
            </div>
            <div className="carousel-dots">
              {horizontalProducts.map((_, index) => (
                <span
                  key={index}
                  className={`carousel-dot ${
                    index === carouselIndex ? "active" : ""
                  }`}
                  onClick={() => handleCarouselDotClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <h2>Product List</h2>
      <ul
        className={`product-list ${selectedProduct ? "horizontal-list" : ""}`}
      >
        {products.map((product) => (
          <li key={product.code}>
            <div
              className="product-item"
              onClick={() => handleSelectedProductClick(product.code)}
            >
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-detail">
                <span className="product-detail-name">{product.name}</span>
                <span className="product-detail-price">
                  {product.price}.00 <span>TL</span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {nextUrl && (
        <button className="load-more-button" onClick={loadMoreProducts}>
          Load More
        </button>
      )}
    </div>
  );
};

export default ProductList;
