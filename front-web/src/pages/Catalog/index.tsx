import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductResponse } from "core/types/Product";
import { makeRequest } from "core/utils/request";
import ProductCardLoader from "./components/Loaders/ProductCardLoader";
import ProductCard from "./components/ProductCard";

import "./styles.scss";

const Catalog = () => {
  // quando s lista de produtos estiver disponível, pouplar um estado no componente,
  // e listar os produtos dinamicamente
  const [productResponse, setProductsResponse] = useState<ProductResponse>();
  const [isLoading, setIsLoading] = useState(false);

  // quando o componente iniciar, buscar a lista de produtos
  useEffect(() => {
    const params = {
      page: 0,
      linesPerPage: 12,
    };

    // iniciar o loader
    setIsLoading(true);
    makeRequest({ url: "/products", params })
    .then((response) => setProductsResponse(response.data))
    .finally(() => {
      // finalizar o loader
      setIsLoading(false);
    })

  }, []);

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catálago de produtos</h1>
      <div className="catalog-products">
        {isLoading ? <ProductCardLoader /> : (
          productResponse?.content.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))
        )}        
      </div>
    </div>
  );
};

export default Catalog;
