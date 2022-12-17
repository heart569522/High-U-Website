import * as React from 'react';
import "./index.css";

// IMPORT COMPONENT
import Navbar from "../components/Navigation/Navigation"
import Footer from "../components/Footer/Footer"

// IMPORT PAGE
import Home from "./Home"
import InjectTailwind from './InjectTailwind';

export default function index() {

  return (
    <div>
      <InjectTailwind>
        <Navbar />
        <Home />
        <Footer />
      </InjectTailwind>

    </div>

  )
}
