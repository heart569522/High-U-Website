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
} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Webcam from 'react-webcam';
import { createTheme, ThemeProvider, } from '@mui/material/styles';

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
                                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                                    <Box className="w-full h-full p-4 rounded-lg shadow-lg">
                                        <img src={image as string | undefined} alt="Captured image" />
                                        <Button onClick={() => setModalOpen(false)}>Close</Button>
                                    </Box>
                                </Modal>
                            </Box>
                        </Grid>
                        {
                            Wig_Product.map((item, i) =>
                                <Grid item sm={1.5} md={2}>
                                    <Card variant="outlined" className="content" >
                                        <CardActionArea>
                                            <CardMedia className="content-overlay" />
                                            <CardMedia
                                                className="content-image w-60 h-60 object-top"
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
                            )
                        }

                    </Grid>
                </Container>
            </Paper>
        </ThemeProvider>

    )
}
