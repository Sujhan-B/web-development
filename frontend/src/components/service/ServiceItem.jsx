import React, { useContext } from 'react';
import './ServiceItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/storecontext';

const ServiceItem = ({ id, name, price, description, image }) => {
  const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);
  const quantity = cartItem?.[id] || 0;

  return (
    <div className='service-item'>
      <div className="service-item-img-container">
        <img
          className='service-item-image'
          src={`${url}/images/${image}`}
          alt={name}
          onError={(e) => (e.target.src = assets.placeholder_image)}
        />
        {quantity === 0 ? (
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className='service-item-count'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
            <p>{quantity}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
          </div>
        )}
      </div>
      <div className="service-item-info">
        <div className="service-item-name-rating">
          <p>{name}</p>
          {/* Optional: <img src={assets.rating_stars} alt="Rating" /> */}
        </div>
        <p className="service-item-description">{description}</p>
        <p className="service-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default ServiceItem;
