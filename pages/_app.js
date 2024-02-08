import React from 'react'
import { DataProvider } from '../Context/datacontext';
import '../styles/globals.css'
import { Layout } from '../Components';
import { Toaster } from "react-hot-toast";
import { useStateContext } from '../Context/datacontext';
import "../styles/paymentForm.css";
import Head from 'next/head';


function MyApp ({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name='viewport' content="width=device-width, initial-scale=1.0, minimum-scale=1.0"/>
    </Head>
    <DataProvider>
      <Layout>
        <Toaster
      toastOptions={{
        className: 'toaster'
      }}
        />
  <Component {...pageProps}/>
  </Layout>
  </DataProvider>
  </>
  )
   }

export default MyApp;
