import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import './App.css'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Navbar from './components/Navbar/Navbar'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import MyOrder from './pages/MyOrders/MyOrder'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/Verify/Verify'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/order' element={<PlaceOrder />}></Route>
          <Route path='/verify' element={<Verify />}></Route>
          <Route path="/myorders" element={<MyOrder />}></Route>

        </Routes>

      </div>
      <Footer />
    </>
  )
}

export default App