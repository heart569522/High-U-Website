import * as React from 'react';

// IMPORT COMPONENT
import Navbar from "../../components/Navigation/Navigation"
import SignInForm from '../../components/Auth/SignInForm';
import Head from 'next/head';

export default function SignIn() {

  return (
      <div>
        <Head><title>Sign In | High U</title></Head>
          <Navbar />
          <SignInForm />
      </div>
    
  )
}
