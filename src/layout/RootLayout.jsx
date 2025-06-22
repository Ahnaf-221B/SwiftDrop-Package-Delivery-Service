import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../pages/Shared/Navbar/Navbar'
import Footer from '../pages/Shared/Footer/Footer'

const RootLayout = () => {
  return (
    <div>
      <div className='mt-5'>
        <Navbar></Navbar>
    
      </div>
         
       
        <Outlet />
        <Footer></Footer>
    </div>
  )
}

export default RootLayout