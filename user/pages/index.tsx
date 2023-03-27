import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SplashScreen from '../components/Other/SplashScreen';
import Navbar from "../components/Navigation/Navigation";
import HomeBackground from "../components/Home/HomeBackground";
import HomeContent from "../components/Home/HomeContent";
import Footer from "../components/Footer/Footer";

export default function Index() {
  // const router = useRouter();
  // const [isHome, setIsHome] = useState(false);

  // useEffect(() => {
  //   setIsHome(router.pathname === '/');
  // }, [router.pathname]);

  return (
    // <>
    //   {isHome ? (
    //     <SplashScreen finishLoading={() => setIsHome(false)} />
    //   ) : (
        <>
          <Navbar />
          <HomeBackground />
          <HomeContent />
          <Footer />
        </>
    //   )}
    // </>
  );
}
