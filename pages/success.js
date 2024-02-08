import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from '../Context/datacontext';
import { runFireworks } from '../lib/util';
import Loading from '../Components/rotateLoader';

const Success = () => {
    const {successPayment, setSuccessPayment, setPaymentDetail} = useStateContext();
    const router = useRouter();
    //PROTECTING ROUTES
    useEffect(() => {
        if(!successPayment){
            router.push("/");
        }else{
        let items = ["cart", "product", "totalQuantities", "totalPrice"]
        items.forEach(k => localStorage.removeItem(k));
        setPaymentDetail(
            {
             }
          );
        runFireworks();
        }
    }, [])
  return (
    <>
    {!successPayment && (
        <Loading/>
    )}
    {successPayment && (
    <div className='success-wrapper'>
        <div className='success'>
    <h2>Your payment is successful.</h2>
            <p className='description'>
               Thank you for your payment, you can always continue shopping with Henry's store.
            </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn" onClick={() => setSuccessPayment(false)}>
                        Continue Shopping
                    </button>
                </Link>
        </div>
    </div>
    )}
    </>
  )
}

export default Success;