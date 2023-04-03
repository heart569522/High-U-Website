import React, { useEffect, useRef, useState } from 'react';
import {
  Grid,
  Paper,
  Container,
  Typography,
  IconButton,
  Modal,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  ImageList,
  ImageListItem,
  Backdrop
} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import { createTheme, ThemeProvider, } from '@mui/material/styles';

// IMPORT COMPONENT
import Navbar from "../components/Navigation/Navigation"

import AR_Data from '../helper/AR_Data.json';
import Head from 'next/head';

const theme = createTheme({
  palette: {
    primary: {
      main: "#F0CA83",
    },
    secondary: {
      main: "#F08383",
    },
  },
  typography: {
    fontFamily: [
      'Prompt, sans-serif'
    ].join(','),
  },

});

export default function TryAR() {

  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  function handleMessage(event: any) {
    console.log(event.data);

    if (event.data.type === "screenshot") {
      setImage(event.data.image);
      setModalOpen(true);
    } else {

    }
  }


  const handleCapture = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow?.postMessage({ type: 'capture' }, '*');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Try AR | High U</title>
      </Head>
      <Navbar />
      <Paper className="bg-[#252525] h-screen max-[899px]:h-full max-[628px]:h-screen">
        <Container maxWidth="xl" >
          <Grid container>
            <Grid item xs={12} className="pt-4 ">
              <Typography variant='h3' className='text-[#F0CA83] text-center max-sm:text-[36px] font-bold'>TRY AR</Typography>
            </Grid>
            <Grid item xs={12} className="pb-2 ">
              <Typography variant='h5' className="text-[#F0CA83] text-center max-sm:text-base">Snap photos and share like never before</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="pt-3">
            <Grid item xs={12} sm={12} md={6}>
              <Box className="w-full border-2 border-[#F0CA83] rounded pb-5">
                <center>
                  <iframe
                    ref={iframeRef}
                    src="/trywig2D/index.html"
                    className="w-full h-[650px] object-cover"
                  />
                  <Grid item xs={12} className="pt-5 text-center">
                    <IconButton
                      onClick={handleCapture}
                      className="text-gray-800 m-auto bg-[#F0CA83] transition hover:bg-[#ffc14d]"
                      size="large"
                    >
                      <CameraAltIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                </center>
                {/* Caprture Result */}
              </Box>
            </Grid>
            <Grid item sm={12} md={6}>
              {AR_Data.map((item, i) =>
                <Grid key={i} item xs={3} sm={3} md={4} className="inline-flex">
                  <Card variant="outlined" className="content">
                    <CardActionArea>
                      <div className="content-overlay" />
                      <CardMedia
                        className="content-image object-top h-56 w-56 max-xl:h-48 max-lg:h-40 max-md:h-48 max-sm:h-28"
                        component="img"
                        image={item.image}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              )}a
            </Grid>
            <Modal
              className="p-4 fixed top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center"
              open={modalOpen}
              onClose={() => setModalOpen(false)}
            >
              <Box className="text-right">
                {image ?
                  <img
                    src={image as string | undefined}
                    alt="Screenshot"
                    className="border-[12px] border-[#646464] rounded w-[600px] h-[600px] object-center object-fill"
                  />
                  : <h1>Error image captured!!</h1>
                }
                <IconButton className="mx-1 mt-2 bg-[#F0CA83] text-black font-bold duration-200 hover:bg-red-400 hover:text-white">
                  <FavoriteIcon />
                </IconButton>
                <IconButton className="mx-1 mt-2 bg-[#F0CA83] text-black font-bold duration-200 hover:bg-green-700 hover:text-white">
                  <DownloadIcon />
                </IconButton>
                <IconButton className="mx-1 mt-2 bg-[#F0CA83] text-black font-bold duration-200 hover:bg-blue-500 hover:text-white">
                  <ShareIcon />
                </IconButton>
                <IconButton className="mx-1 mt-2 bg-[#F0CA83] text-black font-bold duration-200 hover:bg-zinc-700 hover:text-white" onClick={() => setModalOpen(false)}>
                  <ClearIcon />
                </IconButton>
              </Box>
            </Modal>

          </Grid>
        </Container>
      </Paper>
    </ThemeProvider >

  )
}
