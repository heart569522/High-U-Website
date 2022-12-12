import * as React from 'react';
import { Grid } from '@mui/material';

// IMPORT COMPONENT
import Navbar from "../components/Navigation/Navigation"
import LoginForm from '../components/Auth/LoginForm';

export default function Login() {

  return (
      <div>
          <Navbar />
          <LoginForm />
      </div>
    
  )
}
