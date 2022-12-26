import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Container,
    Typography,
    IconButton,
    Modal,
    Button,
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
        <div>
            <ThemeProvider theme={theme}>
                <Paper className="bg-[#252525] h-screen" >
                    <Navbar />
                    <Container maxWidth="xl" >
                        <Grid container>
                            <Grid xs={12} className="pt-4 ">
                                <Typography variant='h3' className='text-[#F0CA83] text-center max-sm:text-[36px] font-bold'>TRY AR</Typography>
                            </Grid>
                            <Grid xs={12} className="pb-2 ">
                                <Typography variant='h5' className="text-[#F0CA83] text-center max-sm:text-base">Snap photos and share like never before</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className="py-5">
                            <Grid item sm={12} md={6} spacing={2}>
                                <div className="w-full h-full ">
                                    <Webcam
                                        className="border-2 border-[#F0CA83]"
                                        width={720}
                                        height={1280}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        mirrored
                                        videoConstraints={videoConstraints}
                                    />
                                    <Grid item xs={12} className="pt-3">
                                        <Button onClick={capture} variant="contained" className="block m-auto bg-[#F0CA83]">
                                            <IconButton className="text-gray-800">
                                                <CameraAltIcon fontSize='large' />
                                            </IconButton>
                                        </Button>
                                    </Grid>
                                    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                                        <div className="w-full h-full p-4 rounded-lg shadow-lg">
                                            <img src={image as string | undefined} alt="Captured image" />
                                            <Button onClick={() => setModalOpen(false)}>Close</Button>
                                        </div>
                                    </Modal>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </ThemeProvider>
        </div>


    )
}
