import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.scss'

const PlaceOrder = () => {

    const { getTotalFromCart, getTotalItemCount, food_list, cartItems, url, token, setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [custemerData, setCustomerData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })
    const onChangeHandler = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setCustomerData(custemerData => ({
            ...custemerData,
            [name]: value
        }))
    }
    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = [];

        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item };
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address: custemerData,
            items: orderItems,
            amount: getTotalFromCart() + 2
        }
        let response = await axios.post(url + '/api/order/place', orderData, { headers: { token } })
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);

        }
        else {
            toast.error(response.data.message)
        }
    }
    useEffect(() => {
        if (!token) {
            navigate('/cart');
        }
        else if (getTotalItemCount() === 0) {
            navigate('/')
        }
    }, [])


    return (
        <div>
            <form action="" onSubmit={placeOrder} className='place-order-form'>
                <div className="place-order-left">
                    <p className='title'>Delivery Information</p>
                    <div className="multi-fields">
                        <input type="text" name="firstName" onChange={onChangeHandler} value={custemerData.firstName} placeholder='First Name' required />
                        <input type="text" name="lastName" onChange={onChangeHandler} value={custemerData.lastName} placeholder='Last Name' required />
                    </div>
                    <input type="email" name="email" onChange={onChangeHandler} value={custemerData.email} placeholder='Email address' required />
                    <input type="text" name="street" onChange={onChangeHandler} value={custemerData.street} placeholder='Street' required />
                    <div className="multi-fields">
                        <input type="text" name="city" onChange={onChangeHandler} value={custemerData.city} placeholder='City' required />
                        <input type="text" name="state" onChange={onChangeHandler} value={custemerData.state} placeholder='State' required />
                    </div>
                    <div className="multi-fields">
                        <input type="text" name="zipcode" onChange={onChangeHandler} value={custemerData.zipcode} placeholder='Zip code' required />
                        <input type="text" name="country" onChange={onChangeHandler} value={custemerData.country} placeholder='Country' required />
                    </div>
                    <input type="number" name="phone" onChange={onChangeHandler} value={custemerData.phone} placeholder='Phone number' required />
                </div>
                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Total</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>$ {getTotalFromCart()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>$ {getTotalFromCart() === 0 ? 0 : 2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>$ {getTotalFromCart() === 0 ? 0 : getTotalFromCart() + 2}</b>
                            </div>
                        </div>
                        <Button type={"submit"} text={"PROCEED TO PAYMENT"} bgColor={"tomato"} color={"white"} style={{ borderRadius: "4px", marginTop: '20px' }}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrder