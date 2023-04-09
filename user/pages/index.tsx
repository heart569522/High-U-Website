import Navbar from "../components/Navigation/Navigation";
import HomeBackground from "../components/Home/HomeBackground";
import HomeContent from "../components/Home/HomeContent";
import Footer from "../components/Footer/Footer";
import Head from "next/head";

export default function Index() {

  return (
    <>
    <Head>
      <title>High U | Hair Wigs</title>
    </Head>
      <Navbar />
      <HomeBackground />
      <HomeContent />
      <Footer />
    </>
  );
}
