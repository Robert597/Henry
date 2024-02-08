import React, {useEffect} from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineAppstoreAdd} from 'react-icons/ai';
import {FaMoon, FaSun}from "react-icons/fa";
import Cart from './Cart';
import { useStateContext } from '../Context/datacontext';
import { useRouter } from 'next/router';




const Navbar = () => {
  const router = useRouter();

  //FETCHING VARIABLES FROM CONTEXTAPI
  const {showCart, setShowCart, totalQuantities, user, setUser, theme, setTheme} = useStateContext();

  //DEFAULT PROFILE PICTURE
 let defaultUrl =  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSissgD_ffoqokwXW3qC_-9In_v2iuRr44lqd0gxumxoR5IW1LxXIndugp5WDofIgOEuoI&usqp=CAU"

 //DARK AND LIGHT MODE TOGGLE
 const handleTheme = (event) => {
  event.target.checked ? setTheme(false) : setTheme(true);
 }
  return (
    <div className='navbar-container'>
      <p className={theme ? "navdark" : "navlight" } onClick={() => router.push("/")}>
       <span>H</span>
       <span>E</span>
       <span className='logounique'>N</span>
       <span>R</span>
       <span>Y</span>
      </p>

  


<div className='cart-icons'>



<button type="button" className={theme ? "home-add-dark": "home-add-light"} onClick={() => router.push("/")}>
Home
</button>
         


  {user?.result?.name && (
    <div className={theme ? "cart-profile-dark" : "cart-profilee"}>
      <div className='cart-imagee cart-icon'>
        <img src={ user?.result?.image || defaultUrl} alt="user"/>
      </div>
      <p className={theme ? "cart-namee-dark" : "cart-namee-light"}>{user?.result?.name.split(" ")[0]}</p>
    </div>
  )}
  {
    !user?.result?.name && (
      <p className={theme ? "cart-login-dark" : "cart-login"}>
        <Link href="/auth">
        Sign In
        </Link>
      </p>
    )
  }
  <div>
  <input type="checkbox" className='checkbox' id="checkbox" onChange={(e) => handleTheme(e)} />
  <label htmlFor='checkbox' className={theme ? "label labeldark" : "label"}>
    <FaSun className='sun'/>
    <FaMoon className='moon'/>
    <div className={theme ? "ball balldark" : "ball"}></div>
  </label>
</div>
  
      <button type='button' className={theme ? "cart-icon-dark" : "cart-icon"} onClick={() => setShowCart(true)}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{totalQuantities}</span>
        </button>
 
        </div>
  {showCart && (
    <Cart/>
  )}
  
    </div>
  )
}

export default Navbar