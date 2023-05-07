import Navbar from "../components/Navigation/Navigation";
import HomeBackground from "../components/Home/HomeBackground";
import HomeContent from "../components/Home/HomeContent";
import Footer from "../components/Footer/Footer";
import Head from "next/head";
import { useEffect } from "react";

const API_URL = "http://localhost:3000"

export default function Index() {

  useEffect(() => {
    fetch(`${API_URL}/api/web_data/addViewWebsite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .catch(error => console.error(error));
  }, []);

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
