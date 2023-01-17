import * as React from 'react';

// IMPORT COMPONENT
import Navbar from "../components/Navigation/Navigation"
import SignUpForm from '../components/Auth/SignUpForm';

export default function SignUp() {

  return (
      <div>
          <Navbar />
          <SignUpForm />
      </div>
    
  )
}
