import * as React from 'react';

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
