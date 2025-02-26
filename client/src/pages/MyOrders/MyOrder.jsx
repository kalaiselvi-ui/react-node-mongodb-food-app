import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import Button from '../../components/Button/Button'
import { StoreContext } from '../../context/StoreContext'
import './MyOrders.scss'

const MyOrder = () => {
    const [data, setData] = useState([])
    const { url, token } = useContext(StoreContext)

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data)
        console.log(response.data.data)

    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }

    }, [token])
    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " X " + item.quantity
                                } else {
                                    return item.name + " x " + item.quantity + " , "
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <Button onClick={fetchOrders} text={"Track Order"} bgColor={"#ffe1e1"} color={"#454545"} style={{ borderRadius: "10px", fontWeight: "200px" }} />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default MyOrder