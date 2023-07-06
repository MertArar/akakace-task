import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail() {
  const { code } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(
      `https://mocki.io/v1/1a1fb542-22d1-4919-914a-750114879775?code=${code}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.result);
      })
      .catch((error) => {
        console.error("Error fetching product detail:", error);
      });
  }, [code]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <div className="left-side-items">
        <h2 className="product-name">{product.productName}</h2>
        <p className="product-badge">{product.badge}</p>
        <p className="product-rating">
          Rating: <span>{product.rating}</span>
        </p>
      </div>
      <div className="product-detail">
        <img
          className="product-img"
          src={product.imageUrl}
          alt={product.productName}
        />

        <div className="capacity">
          <p className="capacity-heading">Kapasite Seçenekleri: </p>
          <div className="button">
            <button>128 GB</button>
            <button>256 GB</button>
            <button>512 GB</button>
          </div>

          <p className="dummy-text">
            132 satıcı içinde kargo dahil en ucuz fiyat seçeneği
          </p>
          <p className="product-price">
            {product.price}.00 <span>TL</span>
          </p>
          <p className="shipping">
            Free Shipping: {product.freeShipping ? "Yes" : "No"}
          </p>
          <p className="update">Son güncelleme: Şimdi</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
