import Navbar from '../components/Navigation/Navigation';
import WigBanner from "../components/Wig/WigBanner"
import Footer from '../components/Footer/Footer';
import WigList from '../components/Wig/WigList';

import Head from 'next/head';

export default function Wig() {

  return (
    <div>
      <Head><title>Wig | High U</title></Head>
      <Navbar />
      <WigBanner />
      <WigList />
      <Footer />
    </div>

  )
}