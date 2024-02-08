import React, { useState, useEffect } from "react"
import { PaystackButton } from "react-paystack";
import { useStateContext } from "../Context/datacontext";
import { useRouter } from "next/router";
import {toast} from "react-hot-toast";
import Loading from "../Components/rotateLoader";

const Payment = () => {
  const router = useRouter();
    const {paymentDetail, setPaymentDetail, setSuccessPayment} = useStateContext();
    const [loading, setLoading] = useState(true);

    //PROTECTING ROUTE
    useEffect(() => {
    if(!paymentDetail?.items?.length){
      router.push("/");
    }else{
      setLoading(false);
    }
    }, []);
    
    //PAYSTACK ID KEY
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK;
   
  const amount = paymentDetail?.Amount
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
   {
    toast.success("purchase was succesful");
   
    setSuccessPayment(true);
    router.push("/success");
   },
    onClose: () => toast.error("don't leave :)"),
  }

  
  return (
    <div className="App">
      {loading && (
       <Loading/>
      )}
      {!loading && (
      <div className="container">
        <div className="item">
          <p className="item-items">Items:</p>
          <div className="item-details">
            <ul>
            {paymentDetail?.items[0]?.map((name, i) => (
                <li key={i}>{name}</li>
            ))}
            </ul>
            <p className="item-details-amount"><span>Total Amount:</span><span> &#8358;{amount/100}</span></p>
          </div>
        </div>
        <div className="checkout-form">
          <form className="checkout-field">
            <label>Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Phone</label>
            <input
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </form>
          <PaystackButton {...componentProps} />
        </div>
      </div>
      )}
    </div>
  )
}
export default Payment