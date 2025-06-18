import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/storecontext'
import axios from 'axios'
import { assets } from '../../assets/assets'



const MyOrders = () => {

    const url = "http://localhost:4000";
    const { token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + '/api/order/userorder', {}, { headers: { token } });
        setData(response.data.orders);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders </h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order">
                            <div className="order-top">
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.items.map((items, index) => {
                                    if (index === order.items.length - 1) {
                                        return items.name + " x " + items.quantity
                                    }
                                    else {
                                        return items.name + " x " + items.quantity + ", "
                                    }
                                })}</p>
                                <button onClick={fetchOrders}>track person</button>
                            </div>
                            <div className="order-bottom">
                                <p>₹{order.amount}.00</p>
                                <p className='delivarydate'>
                                    {new Date(order.deliveryDate).toLocaleString('en-IN', {
                                        weekday: 'short',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                </p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            </div>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
