import React, { useContext, useEffect, useState } from 'react';
import './order.css';
import { StoreContext } from '../../context/storecontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const { getTotalCartAmount, service_list, cartItem, token } = useContext(StoreContext);
  const URL = "http://localhost:4000";

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    date: "",
    time: ""
  });

  const [timeWarning, setTimeWarning] = useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));

    if (name === "time") {
      const [hour] = value.split(':').map(Number);
      if (hour < 9 || hour >= 21) {
        setTimeWarning("⚠️ We work between 9:00 AM and 9:00 PM only.");
      } else {
        setTimeWarning("");
      }
    }
  };

  const order = async (event) => {
    event.preventDefault();

    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!data.date || selectedDate <= today) {
      alert("Please select a valid future date.");
      return;
    }

    const [hour] = data.time.split(':').map(Number);
    if (hour < 9 || hour >= 21) {
      alert("We work between 9:00 AM and 9:00 PM only.");
      return;
    }

    let orderItems = [];

    service_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItem[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 160,
      deliveryDate: data.date,
      deliveryTime: data.time,
    };

    try {
      const response = await axios.post(URL + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  const getTodayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };


  
  return (
    <form onSubmit={order} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-feild">
          <input required name='firstname' onChange={onChangeHandler} value={data.firstname} type="text" placeholder='First Name' />
          <input required name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-feild">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-feild">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Pin Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
        <div className="date-time-group">
          <input required name='date' type='date' min={getTodayDate()} onChange={onChangeHandler} value={data.date} />
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <input required name='time' type='time' onChange={onChangeHandler} value={data.time} />
            {timeWarning && <span className="error-text">{timeWarning}</span>}
          </div>
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-detials">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detials">
              <p>Service Charge</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 160}</p>
            </div>
            <hr />
            <div className="cart-total-detials">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 160}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Order;
