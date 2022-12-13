import * as React from 'react';
import { Grid } from '@mui/material';

// IMPORT COMPONENT
import Navbar from "../components/Navigation/Navigation"
import SignInForm from '../components/Auth/SignInForm';

export default function SignIn() {

  return (
      <div>
          <Navbar />
          <SignInForm />
      </div>
    
  )
}
