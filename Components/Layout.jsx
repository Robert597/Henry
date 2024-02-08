import React, {useEffect} from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useStateContext } from '../Context/datacontext';
import calcScrollValue from '../config/scroll';
import gsap from 'gsap';
import Loading from './rotateLoader';
import {BsArrowUp} from "react-icons/bs";


const Layout = ({children}) => {
  const {loading, theme} = useStateContext();

  //SPLASH SCREEN ANIMATION WITH GSAP
  useEffect(() => {
      window.onscroll = calcScrollValue;
      window.onload = calcScrollValue;

      const tl = gsap.timeline();
      tl.to(
        ".logo-header .logoo", {
          duration: 1,
          delay: 1,
          stagger: .05,
         opacity: 1,
          ease: "slow(0.7, 0.7, false)",
        }
      )
      .to(".logo-header .logoo", {
        duration: 3,
        stagger: .05,
        y: -600,
        opacity: 0,
        delay: 1,
        ease: "slow(0.7, 0.7, false)",
      },1).to(".intro", {
        position: "absolute",
        height: 0,
        duration: 2,
        delay: 1.5,
        ease: "slow(0.7, 0.7, false)"
      }, 1)
  }, [])
  
  return (
    <div className={theme ? "layoutdark" : "layout"}>
      <Head>
        <title>E-Commerce Store</title>
        <link rel="preload" as="font" href="../Fonts/newyork/NewYork\ PERSONAL\ USE.otf" type="font/otf" crossOrigin="anonymous"></link>
        <link rel="preload" as="font" href="../Fonts/neutral_face/NeutralFace.otf" type="font/otf" crossOrigin="anonymous"></link>
    </Head>
    
    
    <div id='progress'>
      <span id="progress-value"><BsArrowUp/></span>
    </div>

    <div className='intro'>
      <h1 className='logo-header'>
        <span className='logoo'>HEN</span><span className='logoo'>
          RY.
          </span>
      </h1>
    </div>
  
      {loading && (
          <Loading/>
        )}
        {!loading && (
          <>
      <header 
      className={theme ? "layoutHeaderdark" : "layoutHeaderlight"}>
        <Navbar/>
      </header>
      <main className='main-container'>
        {children }
      </main>
      <footer>
        <Footer/>
      </footer>
      </>
        )}
    </div>
  )
}

export default Layout