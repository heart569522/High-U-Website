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
  CardActionArea,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import Navbar from "../components/Navigation/Navigation"
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { storage } from './api/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

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

type Props = {
  wigs: [Wig]
}

type Wig = {
  _id: string;
  ar_image: string;
  main_image: string;
  title: string;
  use: number;
}

type Member = {
  _id: string
}

export async function getServerSideProps() {
  try {
    let wigsResponse = await fetch(`${process.env.API_URL}/api/wig_data/getARWigs`);
    let wigs = await wigsResponse.json();
    return {
      props: { wigs: JSON.parse(JSON.stringify(wigs)) }
    }
  } catch (e) {
    console.error(e);
  }
  return {
    props: { wigs: [] }
  };
}

export default function TryAR(props: Props) {
  const [wigData, setWigData] = useState<Wig[]>(props.wigs);
  const wigsWithValidArImage = wigData.filter(wig => wig.ar_image !== null);

  const [uploading, setUploading] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const handleCloseAlertSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertSuccess(false);
  };

  const handleCloseAlertError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertError(false);
  };

  const [member, setMember] = useState<Member | null>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/api/user_data/getUserData`);
        setMember(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  function handleMessage(event: any) {
    if (event.data.type === "screenshot") {
      setImage(event.data.image);
      setModalOpen(true);
    }
  }

  function handleSelectWig(arImage: string, id: string) {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow?.postMessage({ type: 'select', image: arImage }, '*');
      updateWigUse(id).catch(error => console.error(error));
    }
  }

  async function updateWigUse(id: string) {
    const response = await fetch(`${process.env.API_URL}/api/wig_data/useWigAR?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ use: 1 }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to update wig ${id} use count: ${response.status}`);
    }
  }

  const handleCapture = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow?.postMessage({ type: 'capture' }, '*');
    }
  };

  const handleDownload = () => {
    if (image) {
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = image;
      link.click();
    }
  };

  function dataURItoBlob(dataURI: string): Blob {
    const byteString = window.atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  const handleFavorite = async (_id: string | undefined) => {
    setUploading(true);

    if (!_id) {
      alert('Please log in to favorite images.');
      return;
    }

    if (!image) {
      alert('Please capture an image first.');
      return;
    }

    try {
      // Convert data URI to blob
      const blobImage = dataURItoBlob(image);
      const gen_number = Math.floor(Math.random() * 1000000000);
      const captureImageRef = ref(
        storage,
        `member_images/${_id}/${'ar_screenshot_' + gen_number}`
      );
      const uploadTask = uploadBytesResumable(captureImageRef, blobImage, {
        contentType: 'image/png'
      });
      const snapshot = await uploadTask;
      const imageUrl = await getDownloadURL(snapshot.ref);

      const response = await fetch(`${process.env.API_URL}/api/favorite/favoriteARImage?id=${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
        }),
      });

      if (response.ok) {
        setAlertSuccess(true);
        setModalOpen(false);
      } else {
        setAlertError(true);
        throw new Error(await response.text());
      }

    } catch (error) {
      console.error(error);
      setAlertError(true);
    } finally {
      setUploading(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Try AR | High U</title>
      </Head>
      <Navbar />
      <Paper className="bg-[#252525] h-screen max-[899px]:h-full max-[628px]:h-screen">

        <Snackbar open={alertSuccess} autoHideDuration={5000} onClose={handleCloseAlertSuccess}>
          <Alert onClose={handleCloseAlertSuccess} severity="success" sx={{ width: '100%' }}>
            Add to Favorite Success!
          </Alert>
        </Snackbar>
        <Snackbar open={alertError} autoHideDuration={5000} onClose={handleCloseAlertError}>
          <Alert onClose={handleCloseAlertError} severity="error" sx={{ width: '100%' }}>
            Add to Favorite Error!
          </Alert>
        </Snackbar>
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
                    src="./ar_wig/index.html"
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
              {wigsWithValidArImage.map((item, i) =>
                <Grid key={i} item xs={3} sm={3} md={4} className="inline-flex">
                  <Card variant="outlined" className="content">
                    <CardActionArea onClick={() => handleSelectWig(item.ar_image, item._id)}>
                      <div className="content-overlay" />
                      <Image
                        className="content-image object-cover h-56 w-56 max-xl:h-48 max-lg:h-40 max-md:h-48 max-sm:h-28"
                        src={item.main_image}
                        alt={item.title}
                        width={224}
                        height={224}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              )}
            </Grid>
            <Modal
              className="p-4 fixed top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center"
              open={modalOpen}
              onClose={() => setModalOpen(false)}
            >
              <>
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={uploading}
                >
                  <CircularProgress color="inherit" />
                  <Typography>&nbsp;Loading...</Typography>
                </Backdrop>
                <Box className="text-right">
                  {image ?
                    <Image
                      src={image || 'https://via.placeholder.com/600x600.png?text=No+screenshot'}
                      alt="Screenshot"
                      className="border-[12px] border-[#646464] rounded w-[600px] h-[600px] object-center object-cover"
                      width={600}
                      height={600}
                    />
                    : <h1>Error image captured!!!</h1>
                  }
                  <Tooltip title="Favorite">
                    <IconButton
                      className="mx-1 mt-2 bg-[#F0CA83] text-black font-bold duration-200 hover:bg-red-400 hover:text-white"
                      onClick={() => handleFavorite(member?._id)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton
                      className="mx-1 mt-2 bg-[#F0CA83] text-black font-bold duration-200 hover:bg-blue-500 hover:text-white"
                      onClick={handleDownload}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Close">
                    <IconButton
                      className="mx-1 mt-2 bg-[#F0CA83] text-black font-bold duration-200 hover:bg-zinc-700 hover:text-white"
                      onClick={() => setModalOpen(false)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            </Modal>

          </Grid>
        </Container>
      </Paper>
    </ThemeProvider >

  )
}
