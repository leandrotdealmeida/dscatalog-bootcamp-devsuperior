import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductResponse } from "core/types/Product";
import { makeRequest } from "core/utils/request";
import ProductCardLoader from "./components/Loaders/ProductCardLoader";
import ProductCard from "./components/ProductCard";
import "./styles.scss";
import Pagination from "core/components/Pagination";

const Catalog = () => {
  // quando s lista de produtos estiver disponível, pouplar um estado no componente,
  // e listar os produtos dinamicamente
  const [productResponse, setProductsResponse] = useState<ProductResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);

  // quando o componente iniciar, buscar a lista de produtos
  useEffect(() => {
    const params = {
      page: activePage,
      linesPerPage: 12,
    };

    // iniciar o loader
    setIsLoading(true);
    makeRequest({ url: "/products", params })
      .then((response) => setProductsResponse(response.data))
      .finally(() => {
        // finalizar o loader
        setIsLoading(false);
      });
  }, [activePage]);

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catálago de produtos</h1>
      <div className="catalog-products">
        {isLoading ? (
          <ProductCardLoader />
        ) : (
          productResponse?.content.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))
        )}
      </div>
      {productResponse && (
        <Pagination
         totalPages={productResponse.totalPages}
         activePage={activePage} 
         onChange={page => setActivePage(page)}
        />
      )}
    </div>
  );
};

export default Catalog;
