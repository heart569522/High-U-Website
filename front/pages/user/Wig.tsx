import * as React from 'react';
import { useEffect, useState, cloneElement } from 'react';

// IMPORT COMPONENT
import Navbar from '../../components/Navigation/Navigation';
import WigBanner from "../../components/Wig/WigBanner"
import Footer from '../../components/Footer/Footer';
import WigList from '../../components/Wig/WigList';

import { Skeleton } from '@mui/material';

export default function Wig() {
  const [loading, setIsLoading] = useState(true);
  const Skeleton_Loading = cloneElement(<Skeleton animation="wave" variant="rectangular" className="h-52"/>);

  useEffect(() => {
    // Fetch data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [loading]);

  return (
    <div>
      <Navbar />
      {loading ? (Skeleton_Loading) : (
        <WigBanner />
      )}
      <WigList />
      <Footer />
    </div>

  )
}