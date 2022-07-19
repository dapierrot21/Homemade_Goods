import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Col, Row } from "react-bootstrap";
import { listProducts } from "../actions/productActions";

function HomePage({ history }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = history.location.search;

  const topSellers = products.filter((product) => product.rating > 4);

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <h1>Home Page</h1>
      {!keyword && <ProductCarousel />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <h1>Ingredents used</h1>
          </Row>
          <Row>
            <h1>Ingredents used</h1>
          </Row>
          <Row>
            <h1>Ingredents used</h1>
          </Row>
          <Row>
            <h1>Ingredents used</h1>
          </Row>
        </div>
      )}
    </div>
  );
}

export default HomePage;
