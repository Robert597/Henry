import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import { useStateContext } from '../Context/datacontext';

const FooterBanner = ({product}) => {
  const {filterProducts,  bannerDatas, theme} = useStateContext();
  
  
  return (
    <div className={theme ? "footer-banner-container-dark" : "footer-banner-container"}>
      <div className='banner-desc'>
        <div className='left'>
          <p>{bannerDatas[0]?.discount}% off</p>
          <h3>{bannerDatas[0]?.footerLarge}</h3>
          <h3>{bannerDatas[0]?.footerlarge}</h3>
          <p>{bannerDatas[0]?.saleTime}</p>
        </div>
        <div className='right'>
          <div>
          <p>{product?.name}</p>
          <h3>{bannerDatas[0]?.Large}</h3>
          <p>{product?.details}</p>
          <div onClick={() => filterProducts(product._id)}>
            <button type='button'>Shop Now</button>
          </div>
          </div>
        </div>
        <img src={product?.image[0]} className="footer-banner-image"/>
        </div>

    </div>
  )
}

export default FooterBanner