import * as React from 'react';

// IMPORT COMPONENT
import Navbar from '../../components/Navigation/Navigation';
import WigBanner from "../../components/Wig/WigBanner"
import Footer from '../../components/Footer/Footer';
import WigList from '../../components/Wig/WigList';

export default function Home() {

  return (
    <div>
      <Navbar />
      <WigBanner />
      <WigList />
      <Footer />
    </div>
    
  )
}