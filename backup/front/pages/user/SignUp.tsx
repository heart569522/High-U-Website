import * as React from 'react';

// IMPORT COMPONENT
import Navbar from "../../components/Navigation/Navigation"
import SignUpForm from '../../components/Auth/SignUpForm';
import Head from 'next/head';

export default function SignUp() {

  return (
      <div>
        <Head><title>Sign Up | High U</title></Head>
          <Navbar />
          <SignUpForm />
      </div>
    
  )
}
