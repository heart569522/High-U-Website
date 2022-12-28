import React, { useState } from 'react';
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
import Webcam from 'react-webcam';

// IMPORT COMPONENT
import Navbar from "../components/Navigation/Navigation"

import Wig_Product from '../helper/Wig_Product.json';

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

const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: "user"
};

export default function TryAR() {

    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const webcamRef = React.useRef<Webcam>(null);

    const capture = () => {
        const image = webcamRef.current?.getScreenshot();
        setImage(image as string | null);
        setModalOpen(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <Paper className="bg-[#252525] h-screen">
                <Container maxWidth="xl" >
                    <Grid container>
                        <Grid xs={12} className="pt-4 ">
                            <Typography variant='h3' className='text-[#F0CA83] text-center max-sm:text-[36px] font-bold'>TRY AR</Typography>
                        </Grid>
                        <Grid xs={12} className="pb-2 ">
                            <Typography variant='h5' className="text-[#F0CA83] text-center max-sm:text-base">Snap photos and share like never before</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className="pt-3">
                        <Grid item sm={12} md={6} spacing={2}>
                            <Box className="w-full h-full ">
                                <Webcam
                                    className="border-2 border-[#F0CA83]"
                                    width={680}
                                    height={1280}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    mirrored
                                    videoConstraints={videoConstraints}
                                />
                                <Grid item xs={12} className="pt-5 text-center">
                                    <IconButton onClick={capture} className="text-gray-800 m-auto bg-[#F0CA83] transition hover:bg-[#ffc14d]" size='large'>
                                        <CameraAltIcon fontSize='large' />
                                    </IconButton>
                                </Grid>
                                {/* Caprture Result */}
                                <Modal
                                    className="fixed top-0 left-0 z-80 w-screen h-screen bg-black/60 flex justify-center items-center p-4"
                                    open={modalOpen}
                                    onClose={() => setModalOpen(false)}
                                >
                                    <Box className="text-center">
                                        <img src={image as string | undefined} alt="Captured image" className="border-[12px] border-[#646464] " />
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
                            </Box>
                        </Grid>
                        {/* {Wig_Product.map((item, i) =>
                            <Grid item xs={4} sm={4} md={2} className="">
                                <Card variant="outlined" className="content">
                                    <CardActionArea>
                                        <CardMedia className="content-overlay" />
                                        <CardMedia
                                            className="content-image object-top w-60 h-60 "
                                            component="img"
                                            image={item.image}
                                        />
                                        <CardContent className="content-details fadeIn-bottom">
                                            <Typography gutterBottom component="div" className="text-white font-bold text-md mb-2">
                                                {item.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )} */}
                        <Grid item sm={12} md={6} spacing={2}>
                            <ImageList
                                className="w-full h-full overflow-hidden object-top"
                                sx={{
                                    height: 350,
                                    '@media (max-width: 1257px)': {
                                        height: 250,
                                    },
                                    '@media (max-width: 991px)': {
                                        height: 310,
                                    },
                                    '@media (max-width: 767px)': {
                                        height: 270,
                                    },
                                    '@media (max-width: 575px)': {
                                        height: 200,
                                    },
                                }}
                                cols={4}
                                rowHeight={0}
                            >
                                {Wig_Product.map((item) => (
                                    <ImageListItem key={item.image} className="p-2">
                                        <img
                                            className="rounded hover:opacity-80 transition duration-200 ease-in-out"
                                            src={item.image}
                                            alt={item.color}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Grid>

                    </Grid>
                </Container>
            </Paper>
        </ThemeProvider>

    )
}
