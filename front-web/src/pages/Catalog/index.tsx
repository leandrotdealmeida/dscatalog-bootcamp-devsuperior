import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../core/utils/request';
import ProductCard from './components/ProductCard';
import './styles.scss';

const Catalog = () => {
    // quando o componente iniciar, buscar a lista de produtos
    // quando s lista de produtos estiver disponível, pouplar um estado no componente,
    // e listar os produtos dinamicamente

    useEffect(() => {
        const params = {
            page: 0,
            linesPerPage: 12,
        }

        makeRequest({ url: '/products', params})
         .then(response => console.log(response));

    }, []);
    
    return (
        <div className="catalog-container">
        <h1 className="catalog-title">
            Catálago de produtos
        </h1>
        <div className="catalog-products">
            <Link to="/products/1"> <ProductCard /> </Link>
            <Link to="/products/2"> <ProductCard /> </Link>
            <Link to="/products/3"> <ProductCard /> </Link>
            <Link to="/products/4"> <ProductCard /> </Link>
            <Link to="/products/5"> <ProductCard /> </Link>
            <Link to="/products/6"> <ProductCard /> </Link>
            <Link to="/products/7"> <ProductCard /> </Link>
            <Link to="/products/8"> <ProductCard /> </Link>
            <Link to="/products/9"> <ProductCard /> </Link>
            <Link to="/products/10"> <ProductCard /> </Link>
        </div>
    </div>
    )
}

export default Catalog;