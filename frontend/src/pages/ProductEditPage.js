import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditPage({ match, history }) {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()


    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, success:successUpdate, error:errorUpdate } = productUpdate


    useEffect(() => {

        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if(!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
   
    }, [product, productId, history, dispatch, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            countInStock,
            description
        }))

    }


    return (
    <div>
        <Link to='/admin/productlist'>
            Go Back
        </Link>

        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control 
                            type='name'
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>
                            Price
                        </Form.Label>
                        <Form.Control 
                            type='number'
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>
                            Product Image
                        </Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder="Upload Product Image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>
                            Category
                        </Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder="Enter Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInsTock'>
                        <Form.Label>
                            In Stock
                        </Form.Label>
                        <Form.Control 
                            type='number'
                            placeholder="Enter Stock Count Number"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>
                            Description
                        </Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Row className='py-3'>
                        <Col>
                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Col>
                    </Row>

                </Form>
            )}
        </FormContainer>
    </div>

    )
}

export default ProductEditPage
