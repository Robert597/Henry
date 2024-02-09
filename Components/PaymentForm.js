import React, {useState, useEffect} from 'react';
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useStateContext } from '../Context/datacontext';
import {FaTimes, FaCreditCard, FaPhone} from 'react-icons/fa';
import Link from 'next/link';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const {user, paymentDetail, setSuccessPayment, product} = useStateContext();

    const [selected, setSelected] = useState("Legal");
    const [eligibility, setEligibility] = useState(false);
    const [loading, setLoading] = useState(false);
    const [agree, setAgree] = useState(false);
 
    
    //PROTECTING ROUTES
    useEffect(() => {
        if(!user?.result){
            router.push("/");
        }
    }, [])
    
    const handleEligibility = (e) => {
        setSelected(e.target.textContent);
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
       
            if (!stripe) {
                return alert("check your internet connection.");
              }
          
              
              await elements.submit();
             try{
          setLoading(true);
              // Create the subscription
              const res = await axios.post('https://cute-jade-coral-tutu.cyclic.app/create-subscription', {
                  priceId: product?.priceId, 
                  customerId: user?.result?.customerId
              })
              
              const clientSecret = res.data.clientSecret;
              
          
              const {paymentIntent, error} = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url:"http://localhost:3000/success"
                },
                redirect: 'if_required'
              });
            
console.log(paymentIntent);
            
               
         if (error){
           
            alert(error.message)
         } else {
    
                setSuccessPayment(true);
              router.push('/success');
              }
            }catch(err){
                alert(err?.message)
                setLoading(false);
            }finally{
                setLoading(false);
            }
         
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement/>
            {loading ? (
                <p>Loading</p>
            ) : (
                <>
                <div className="stripe-checkbox"><input type="checkbox" onChange={() => setAgree(!agree)}/> I have read and agreed to the <Link href="/policy">terms and conditions</Link>.</div>
                <button className='subscribe' type="submit" disabled={!stripe || !elements || !agree}>Subscribe</button>
                </>
            )}
          
            <p className='term1'>By confirming your subscription, you allow Henry's Store to charge you for future payments in accordance to their terms, you can always cancel your subscription.</p>

            <p className='term2'>By clicking 'Subscribe', you agree to authorize payments pursuant to these <Link href="/policy">terms</Link>.</p>

            {!eligibility && (
                 <p onClick={() => setEligibility(!eligibility)} className='Eligibility'>Eligible for a refund.</p>
            )}
           
{eligibility && (
     <div className='Eligibility_section'>
     <div className='Eligibility_top'>
         <h1>Henry Store's</h1>
         <div className='eligibility-Icon' onClick={() => setEligibility(!eligibility)}>
             <FaTimes className="eligibility_icon"/>
         </div>
     </div>
         <hr/>
         <ul className='Eligibility_menu'>
             <li className={selected == "Legal" ? 'Eligibility_link Legal' : 'Eligibility_link'} onClick={handleEligibility}>Legal</li>
             <li className={selected == "Refunds" ? 'Eligibility_link Refunds' : 'Eligibility_link'} onClick={handleEligibility}>Refunds</li>
             <li className={selected == "Contact" ? 'Eligibility_link Contact' : 'Eligibility_link'} onClick={handleEligibility}>Contact</li>
         </ul>
     <hr/>
     <div className='Eligibility_content'>
        {
            selected == 'Legal' ? (
                <div className="legal">
                <h1><FaCreditCard/> Payment Terms</h1>
                <p>All payments are securely processed by Stripe. View Stripe's <a href="https://stripe.com/en-gb-us/legal/end-customer-ach-payments-authorization" target='_blank'>terms</a> and <a href="https://stripe.com/privacy" target='_blank'>privacy</a>  policies.</p>
                </div>
            ) : selected == 'Refunds' ? (
                <div className="refunds">
                    <h1>Refunds Allowed</h1>
                    <ul>
                        <li>Eligible for a full Refund.</li>
                        <li>Refunds accepted within 90days of purchase.</li>
                    </ul>
                </div>
            ) : (
                <div className="contacts">
                    <h1><FaPhone/> Contact Support</h1>
                    <p>if you have questions, email us at <span className="underline">henry04@gmail.com</span> or call <span className="underline">+1 971 279 8854</span></p>
                </div>
            )
        }
     </div>
 </div>
)}
           
          
        </form>
    )
}
export default PaymentForm;
 