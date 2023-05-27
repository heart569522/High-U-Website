import * as React from 'react';
import Head from 'next/head';

// IMPORT PAGE
import SignIn from "./SignIn"

export default function index() {

  return (
    <div>
        <Head><title>SignIn | High U Administrator</title></Head>
        <SignIn />
    </div>

  )
}