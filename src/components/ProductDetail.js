import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <h1>Product Detail</h1>
      <img src={product.imageUrl} alt={product.productName} />
      <h2>{product.productName}</h2>
      <p>{product.badge}</p>
      <p>Rating: {product.rating}</p>
      <p>Price: {product.price}</p>
      <p>Free Shipping: {product.freeShipping ? "Yes" : "No"}</p>
    </div>
  );
}

export default ProductDetail;
