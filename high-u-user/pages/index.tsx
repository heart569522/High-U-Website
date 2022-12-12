import * as React from 'react';
// import { Grid } from '@mui/material';

// IMPORT COMPONENT
import Navbar from "../components/Navigation/Navigation"
import Footer from "../components/Footer/Footer"

// IMPORT PAGE
import Home from "./Home"

export default function index() {

  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>

  )
}
