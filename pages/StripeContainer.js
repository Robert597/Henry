import React, {useState, useEffect} from 'react';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import PaymentForm from '../Components/PaymentForm';

const PUBLIC_KEY = "pk_live_51NvRdNAwPxrBpTptL3OuxtwRPvlWtx4270HE6hdWKkCOF2ZEKf2T3TLQHo6tXfu13tDzq0YyUxR1kJOSUbFI9lEX00huMUI5lG"

const stripeTextPromise = loadStripe(PUBLIC_KEY);
const StripeContainer = () => {
 
const appearance = {
    theme: 'stripe',
  };
 
  const options = {
    mode: 'subscription',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance
  };
  return (
   
   <Elements stripe={stripeTextPromise} options={options}>
      <PaymentForm/>
   </Elements>

  )
}

export default StripeContainer