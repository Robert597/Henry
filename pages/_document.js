import { Html, Head, Main, NextScript } from 'next/document'
import { useStateContext } from '../Context/datacontext';

export default function Document() {
    const {theme} = useStateContext
  return (
    <Html>
        <Head/>
      <body className={theme ? "dark" : "light"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}