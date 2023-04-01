import React, { useEffect, useState } from 'react';
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
import * as faceapi from 'face-api.js';
import { WithFaceLandmarks } from 'face-api.js';

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

const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: "user"
};

export default function TryAR() {

    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const webcamRef = React.useRef<Webcam>(null);

    const [modelsLoaded, setModelsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        ]).then(() => setModelsLoaded(true));
    }, []);

    const capture = async () => {
        const image = webcamRef.current?.getScreenshot();
        setImage(image as string | null);

        if (modelsLoaded && image && webcamRef.current?.video) {
            const img = await faceapi.fetchImage(image);
            const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks() as WithFaceLandmarks<faceapi.WithFaceDetection<{}>>[];
            if (detections.length > 0) {
                const canvas = document.createElement('canvas');
                canvas.width = webcamRef.current?.video.videoWidth ?? 0;
                canvas.height = webcamRef.current?.video.videoHeight ?? 0;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(webcamRef.current?.video, 0, 0);
                    const resizedDetections = faceapi.resizeResults(detections, {
                        width: detections[0].detection.box.width,
                        height: detections[0].detection.box.height
                    }).withFaceLandmarks();
                    const faceLandmarks = resizedDetections[0].landmarks;
                    const imgElement = document.createElement('img');
                    imgElement.src = '../public/hair_models.png';
                    imgElement.onload = () => {
                        faceapi.matchDimensions(canvas, resizedDetections[0].detection);
                        const wigSize = Math.abs(faceLandmarks[14].x - faceLandmarks[0].x);
                        const wigWidth = wigSize * (imgElement.width / imgElement.height);
                        const wigHeight = wigSize;
                        const wigX = faceLandmarks[0].x - (wigWidth / 2);
                        const wigY = faceLandmarks[0].y - (wigHeight / 2);
                        const wigPosition = new faceapi.Rect(wigX, wigY, wigWidth, wigHeight);
                        ctx.drawImage(imgElement, wigPosition.x, wigPosition.y, wigPosition.width, wigPosition.height);
                        setImage(canvas.toDataURL('image/jpeg'));
                        setModalOpen(true);
                    };
                }
            }
        }
    };



    return (
        <ThemeProvider theme={theme}>
            <Head><title>Try AR | High U</title></Head>
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
                        <Grid item sm={12} md={6}>
                            <Box className="w-full h-full ">
                                <center>
                                    <Webcam
                                        className="border-2 border-[#F0CA83] rounded"
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
                            )}
                        </Grid>
                        <Modal
                            className="p-4 fixed top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center"
                            open={modalOpen}
                            onClose={() => setModalOpen(false)}
                        >
                            <Box className="text-right">
                                <img src={image as string | undefined} alt="Captured image" className="border-[12px] border-[#646464] rounded" />
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
        </ThemeProvider>

    )
}
