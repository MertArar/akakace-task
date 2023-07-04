import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // API'den ürünleri çekmek için gerekli isteği yapabilirsiniz.
    // Burada örnek verileri kullanacağım.
    const fetchData = async () => {
      // Listeleme için örnek veriler
      const response = {
        result: [
          {
            code: 123,
            imageUrl: "https://cdn.akakce.com/x/apple/iphone-13.jpg",
            name: "iPhone 13 128 GB",
            dropRatio: 8.3,
            price: 20137,
            countOfPrices: 121,
            followCount: 3123,
          },
          // Diğer ürünler buraya eklenebilir
        ],
      };

      setProducts(response.result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Ürün Listesi</h1>
      <div className="product-list">
        {products.map((product) => (
          <Link
            to={`/product/${product.code}`}
            key={product.code}
            className="product-item"
          >
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
