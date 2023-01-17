import * as React from 'react';

// IMPORT COMPONENT
import Navbar from "../../components/Navigation/Navigation"
import SignInForm from '../../components/Auth/SignInForm';

export default function SignIn() {

  return (
      <div>
          <Navbar />
          <SignInForm />
      </div>
    
  )
}
