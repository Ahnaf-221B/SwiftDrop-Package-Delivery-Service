import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import Paymentform from './Paymentform';

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);
  return (
    <Elements stripe={stripePromise}>
        <Paymentform></Paymentform>
    </Elements>
  )
}

export default Payment