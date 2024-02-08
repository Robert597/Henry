import React, {useEffect, useState} from 'react';
import { Product, FooterBanner, HeroBanner } from '../Components';
import { useStateContext } from '../Context/datacontext';
import { useRouter } from 'next/router';
import decode from "jwt-decode"
import StripeContainer from './StripeContainer';


const Home = () => {
  const router = useRouter();
  const {productDatas, bannerDatas, user, setUser, logout, theme, customer} = useStateContext();
  const [number, setNumber] = useState(Math.floor(Math.random() * ((productDatas.length-1) - 0 + 1)) + 0);

  //fetching user token from local storage after page is refreshed
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    
   
    const getToken = JSON.parse(localStorage.getItem("profile"));
    const token = getToken?.token;

    if(token){
      const decodedToken = decode(token);
      
      if(decodedToken.exp *1000 < new Date().getTime()) return logout()
  }
  }, [router.query.slug])

  return (
    <>
  
    <HeroBanner/>
    <div className={theme ? "products-heading-dark": "products-heading"}>
      <h2>Best Selling Products</h2>
      <p>quality and durable products</p>
    </div>
    <div className='products-container'>
      {productDatas?.map((product) => (
        <Product key={product._id} product={product}/>
      )
      )}
      
    </div>

   <FooterBanner product={productDatas[number]}/>
   </>
  )
}

export default Home;
