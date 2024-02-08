import React from 'react';
import { useStateContext } from '../Context/datacontext';
const HeroBanner = () => {
    const {theme} = useStateContext();
  return (
    <div className={theme ? "hero-banner-container-dark": "hero-banner-container"}>
        <div>
            <p className='beats-solo'>
            Beats Solo
            </p>
            <h3>Wireless</h3>
            <h1>Headphones</h1>
            
        
                   <img src="/assets/headphones_a_2.webp" alt="Picture of the products" 
                   className='hero-banner-image'/>
      
           
            <div>
                <div>
                    <button type='button'>Buy Now </button>
                </div>
                <div className='desc'>
                    <h5>Description</h5>
                    <p>The game here begins with immortal 1000D gaming headphones, dont just play the game, feel it, live it and own it. level up your audio game. </p> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner