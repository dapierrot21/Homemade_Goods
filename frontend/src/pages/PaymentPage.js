import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutProcess from '../components/CheckoutProcess'

function PaymentPage({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal') // MAKE THIS A EMPTY STRING WHEN ADDING A DIFFERENT PAYMENT METHOD.

    if (!shippingAddress.address) {
        history.push('/shipping')
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
          <CheckoutProcess step1 step2 step3 />

          <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Payment Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        
                    </Form.Check>
                </Col>
            </Form.Group>
            <Row className='py-3'>
                <Col>
                    <Button type='submit' variant='primary'>
                        Continue
                    </Button>
                </Col>
            </Row>
          </Form> 
        </FormContainer>
    )
}

export default PaymentPage
