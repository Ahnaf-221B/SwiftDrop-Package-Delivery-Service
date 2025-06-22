import React from 'react'
import Banner from '../Banner/Banner'
import Services from '../Services/Services'
import ClientLogo from '../ClientLogo/ClientLogo'
import Benefits from '../Benefit/Benefits'
import BeMerchant from '../BeMerchant/BeMerchant'

const Home = () => {
  return (
    <div >
        <div className='mt-10 mb-10 '>
            <Banner></Banner>
        </div>
        <Services></Services>
        <ClientLogo></ClientLogo>
        <Benefits></Benefits>
        <BeMerchant></BeMerchant>
        
    </div>
  )
}

export default Home