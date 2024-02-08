import React from 'react';
import {AiFillInstagram, AiOutlineTwitter, AiFillFacebook} from 'react-icons/ai';
import { useStateContext } from '../Context/datacontext';

const Footer = () => {
  const {theme} = useStateContext();
  return (
    <div className={theme ? "footer-container-dark" : "footer-container"}>
        <p>copyright&copy;2024, Henry's Store. All Rights Reserved.</p>
    </div>
  )
}

export default Footer