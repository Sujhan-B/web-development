  import React, { useState } from 'react'
  import Navbar from './components/navbar/navbar.jsx'
  import { Route, Routes } from 'react-router-dom'
  import Home from './pages/home/home'
  import Cart from './pages/cart/cart'
  import Order from './pages/service_order/order'
  import Footer from './components/Footer/Footer.jsx'
  import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
  import Verify from './pages/verify/verify.jsx'
  import MyOrders from './pages/Myorders/MyOrders.jsx'

  const App = () => {

    const [showLogin,setShowLogin] =useState(false)

    return (
      <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
        <div>
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/Order' element={<Order />} />
            <Route path='/Verify' element={<Verify />} />
            <Route path='/myorders' element={<MyOrders />} />
          </Routes>
        </div>
        <Footer />
      </>
    )
  }

  export default App
