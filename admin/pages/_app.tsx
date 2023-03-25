import { useEffect } from 'react';
import AOS from 'aos';
import { SessionProvider } from "next-auth/react"

import 'aos/dist/aos.css';
import '../styles/globals.css'
import '../styles/lodingStyle.css'
import '@tremor/react/dist/esm/tremor.css'
import Layout from '@/components/Layout';

import type { AppProps } from 'next/app'
import index from '.';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 1250
    }),
      AOS.refresh();
  }, []);

  // Render the Component directly if it is the index page
  if (Component === index) {
    return (
      <SessionProvider session={session}>
        <title>High U | Administrator</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <title>High U | Administrator</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
