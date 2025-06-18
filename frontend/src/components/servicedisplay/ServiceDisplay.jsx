import React, { useContext } from 'react'
import './ServiceDisplay.css'
import { StoreContext } from '../../context/storecontext'
import ServiceItem from '../service/ServiceItem'

const ServiceDisplay = ({category}) => {
  
    const {service_list} = useContext(StoreContext)

    return (
    <div className='Service_display' id='Service_display'>  
    <hr />
      <h2>Our Exclusive Services</h2>    
      <div className="Service-display-list">
        {service_list.map((item,index)=>{
          {console.log(category,item.category)}
          if (category === "All" || category === item.category) {
              return <ServiceItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          }
        })}
      </div>
    </div>
  )
}

export default ServiceDisplay
