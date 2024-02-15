import React, {useState, useEffect} from 'react';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import PaymentForm from '../Components/PaymentForm';

const PUBLIC_KEY = "pk_test_51NvRdNAwPxrBpTptCYyQaVqsq5gxBSeuqz759vEN19ODZQWOuK1l29F1pu5UmtVOrMcvZNboMlz00oXQZkjZRP6w00UxT16Kyv"

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