import React, { useState, useEffect } from 'react'
import './List.css'
import axios from "axios"
import { toast } from "react-toastify"

const List = ({ url }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/service/list`)
    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error("Error fetching list")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeService = async (serviceId) => {
    const response = await axios.post(`${url}/api/service/remove`, { id: serviceId })
    await fetchList()
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='list add flex-col'>
      <p>All Services List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div className="list-row" key={index}>
            <div className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeService(item._id)} className='cursor'>X</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
