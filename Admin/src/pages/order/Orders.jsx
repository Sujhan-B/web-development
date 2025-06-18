import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchallOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHnadler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId: orderId,
      status: event.target.value
    });
    if (response.data.success) {
      toast.success("Status updated");
      await fetchallOrders();
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchallOrders();
  }, []);

  // Utility to format date and time
  const formatDeliveryDateTime = (isoString) => {
    if (!isoString) return "Not Scheduled";
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="orderlist">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-service">
                {(order.items || [])
                  .map((item) => `${item.name} x ${item.quantity}`)
                  .join(', ')}
              </p>
              <p className="order-item-name">
                {order.address.firstname + " " + order.address.lastname}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>{order.address.city + ", "}</p>
                <p>
                  {order.address.city + ", " +
                    order.address.state + ", " +
                    order.address.country + ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
              <p className="order-item-delivery">
                Report on : {formatDeliveryDateTime(order.deliveryDate)}
              </p>
            </div>
            <p>items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event) => statusHnadler(event, order._id)} value={order.status}>
              <option value="our man getting equiped">our man getting equiped</option>
              <option value="our man is on the way">our man is on the way</option>
              <option value="our man reached">our man reached</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
