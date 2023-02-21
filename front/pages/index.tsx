// "use client"

// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router'
// import { path } from 'animejs'

// // IMPORT COMPONENT
// import SplashScreen from '../components/Other/SplashScreen';
// import Navbar from "../components/Navigation/Navigation"
// import HomeBackground from "../components/Home/HomeBackground"
// import HomeContent from "../components/Home/HomeContent"
// import Footer from "../components/Footer/Footer"

// export default function index() {
//   const router = useRouter()
//   const isHome = router.pathname === "/"
//   const [isLoading, setIsLoading] = useState(isHome)

//   useEffect(() => {
//     if (isLoading) return
//   }, [isLoading])

//   return (
//     <>
//       {isLoading && isHome ? (
//         <SplashScreen finishLoading={() => setIsLoading(false)} />
//       ) : (
//         <>
//           <Navbar />
//           <HomeBackground />
//           <HomeContent />
//           <Footer />
//         </>
//       )}
//     </>

//   )
// }

import * as React from 'react';

// IMPORT COMPONENT
import SplashScreen from '../components/Other/SplashScreen';
import Navbar from "../components/Navigation/Navigation"
import HomeBackground from "../components/Home/HomeBackground"
import HomeContent from "../components/Home/HomeContent"
import Footer from "../components/Footer/Footer"

export default function index() {


  return (
    <>
      <Navbar />
      <HomeBackground />
      <HomeContent />
      <Footer />
    </>

  )
}
