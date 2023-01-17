import * as React from 'react';

// IMPORT COMPONENT
import Navbar from "../../components/Navigation/Navigation"
import WigProductItem from '../../components/Wig/WigProduct_Item';
import Footer from '../../components/Footer/Footer';

export default function WigProduct() {
  return (
    <div>
        <Navbar />
        <WigProductItem />
        <Footer />
    </div>
  );
}
