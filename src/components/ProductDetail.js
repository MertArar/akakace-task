import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { code } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // API'den ürün detayını çekmek için gerekli isteği yapabilirsiniz.
    // Burada örnek verileri kullanacağım.
    const fetchData = async () => {
      // Ürün detayı için örnek veri
      const response = {
        result: {
          mkName: "Apple",
          productName: "iPhone 13 128 GB",
          badge: "En Populer Cep Telefonu",
          rating: 4.3,
          imageUrl: "https://cdn.akakce.com/z/apple/iphone-13.jpg",
          storageOptions: ["128 GB", "256 GB", "512 GB"],
          countOfPrices: 132,
          price: 20567,
          freeShipping: true,
          lastUpdate: "Simdi",
        },
      };

      setProduct(response.result);
    };

    fetchData();
  }, []);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Ürün Detayı</h1>
      <div>
        <img src={product.imageUrl} alt={product.productName} />
        <h2>{product.productName}</h2>
        <p>Price: {product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
