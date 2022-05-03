import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Col, Row } from "react-bootstrap";
import { listProducts } from "../actions/productActions";

function BodyButterPage({ history }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = history.location.search;

  const bodyButters = products.filter(
    (product) => product.category.toLowerCase() === "body butter"
  );

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword}
      <h1>Body Butter Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {bodyButters.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {/* <Paginate page={page} pages={pages} keyword={keyword} /> */}
        </div>
      )}
    </div>
  );
}

export default BodyButterPage;
