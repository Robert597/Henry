import React from 'react';
import Link from 'next/link';
import { useStateContext } from '../Context/datacontext';
import {MdOutlineDeleteSweep} from "react-icons/md";

const Product = ({product}) => {
  const {filterProducts, theme, loading, user, deleteItem} = useStateContext();
  
  return (
    <div className={theme ? "product-dark" : "product"}>
      <div className='product-wrapper'>
          <div className='product-card'
          onClick={() => {{filterProducts(product?._id)}}}>
            <img src={product?.image[0]} alt="Picture of the products" 
            width={250}
            height={250}
            className="product-image"/>
            <p className='product-name'>{product?.name}</p>
            <p className='product-price'>&#36;{product?.price}</p>
          
          </div>
          { !loading && user?.result?.frontEndRoles?.includes("Admin") && ( 
          <MdOutlineDeleteSweep 
          className='delIcon' onClick={() => deleteItem(product?._id)}/>
            )}
      </div>
    </div>
  )
}

export default Product;