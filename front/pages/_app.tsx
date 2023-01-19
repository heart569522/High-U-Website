import { useEffect } from 'react';
import AOS from 'aos';

import 'aos/dist/aos.css';
import '../styles/globals.css'
import '../styles/globals_admin.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration : 1250
    }),
    AOS.refresh();
  }, []);

  return (
    <>
    <Component {...pageProps} />
      <title>High U Hair Wigs</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ) 
}
