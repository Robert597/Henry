import React from 'react';
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai';
import {TiDeleteOutline} from "react-icons/ti";
import { useRouter } from 'next/router';
import { useStateContext } from '../Context/datacontext';
import {FiLogOut, FiLogIn} from 'react-icons/fi';

const Cart = () => {
    const router = useRouter();
    const {totalQuantities, cartItems, setShowCart, setPaymentDetail,  onRemove, user, logout} = useStateContext();

  return (
    <div className="cart-wrapper">
    <div className="cart-container">
      <button
      type="button"
      className="cart-heading"
      onClick={() => setShowCart(false)}>
        <AiOutlineLeft />
        <span className="heading">{user?.result ? `${user?.result?.name.split(" ")[0]}'s cart` : "Your cart"}</span>
        <span className="cart-num-items">({totalQuantities} items)</span>
      </button>
    
      {cartItems.length < 1 && (
        <div className="empty-cart">
          <AiOutlineShopping size={150} />
          <h3>Your shopping bag is empty</h3>
          <Link href="/">
            <button
              type="button"
              onClick={() => setShowCart(false)}
              className="btn"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      <div className="product-container">
        {cartItems.length >= 1 && cartItems.map((item) => (
          <div className="product1" key={item._id}>
            <img src={(item?.image[0])} className="cart-product-image" />
            <div className="item-desc">
              <div className="flex top">
                <h5>{item.name}</h5>
                <h4>&#36;{item.price}</h4>
              </div>
              <div className="flex bottom">
                <div>
                <button type="button" className="btn" onClick={()=> {
              if(!user?.result){
                alert("Login to pay for products")
                router.push("/auth");
              setShowCart(false);
              }else{
              setPaymentDetail(item);
              router.push("/StripeContainer");
              setShowCart(false);
            }
            }}>
              subscribe
            </button>
                </div>
                <button
                  type="button"
                  className="remove-item"
                  onClick={() => onRemove(item)}
                >
                  <TiDeleteOutline />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
              type="button"
              className="logBtn"
            >
              {user?.result ? (
                <div onClick={() => {logout();
                setShowCart(false)}}> 
                <p>Logout</p>
                <FiLogOut/>
                </div>
              ) : (
                <div onClick={() => {router.push('/auth')
                setShowCart(false)}}>
                <p>Login</p>
                <FiLogIn/> 
                </div>
              )}
            </button>
    </div>
  </div>
  )
}

export default Cart