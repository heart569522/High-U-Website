import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    IconButton,
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    Tab,
    Card,
    CardContent,
    CardActionArea,
    Modal,
    Tooltip,
    Snackbar,
    Alert,
    Backdrop,
    CircularProgress,
} from '@mui/material';
import {
    TabContext,
    TabList,
    TabPanel,
} from '@mui/lab';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import DownloadIcon from '@mui/icons-material/Download';
import Navbar from '@/components/Navigation/Navigation';
import UserHeader from '@/components/Auth/UserHeader';
import EmptyARImage from '@/components/Other/EmptyARImage';
import Head from 'next/head';
import { getSession, GetSessionParams } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import EmptyFavorite from '@/components/Other/EmptyFavorite';
import { storage } from './api/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

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

type Wig = {
    _id: string;
    main_image: string;
    title: string;
}

type Member = {
    _id: string
}

type FavoriteState = {
    [key: string]: boolean;
};

type AR_Image = {
    _id: string;
    image: string;
}

export default function Favorite() {
    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const [favoriteWigs, setFavoriteWigs] = useState<FavoriteState>({});
    const [favoriteARImage, setFavoriteARImage] = useState<AR_Image[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [member, setMember] = useState<Member | null>(null);
    const [wigs, setWigs] = useState<Wig[]>([]);
    const [isHoverFavBtn, setIsHoverFavBtn] = useState(false);
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

    const handleMouseEnter = () => {
        setIsHoverFavBtn(true);
    };

    const handleMouseLeave = () => {
        setIsHoverFavBtn(false);
    };

    const handleClickImage = (image: string) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

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

    useEffect(() => {
        const fetchWigs = async () => {
            try {
                const response = await axios.get(`${process.env.API_URL}/api/wig_data/getAllWigs`);
                setWigs(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWigs();
    }, []);

    useEffect(() => {
        const fetchFavoriteWigs = async () => {
            if (!member) return;

            try {
                const favorites = await axios.get(`${process.env.API_URL}/api/favorite/getFavoriteData?member_id=${member._id}`);

                const favoriteState = favorites.data.reduce((acc: FavoriteState, favorite: any) => {
                    const wigId = favorite.wig_id.toString(); // Convert wig ID to string for indexing
                    acc[wigId] = true;
                    return acc;
                }, {});

                setFavoriteWigs(favoriteState);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFavoriteWigs();
    }, [member]);

    useEffect(() => {
        const fetchFavoriteImages = async () => {
            if (!member) return;

            try {
                const res = await axios.get(`${process.env.API_URL}/api/favorite/getFavoriteARImage?member_id=${member._id}`);

                setFavoriteARImage(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFavoriteImages();
    }, [member]);

    const favoriteWigIds = Object.keys(favoriteWigs);
    const favoriteWigsList = wigs.filter((wig) => favoriteWigIds.includes(wig._id));

    function convertURLtoImage(url: string, filename: string) {
        const imgElement = document.createElement('img');
        imgElement.crossOrigin = 'anonymous';
        imgElement.src = url;

        imgElement.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.drawImage(imgElement, 0, 0);
                canvas.toBlob(function (blob) {
                    const link = document.createElement('a');
                    link.download = filename;
                    link.href = URL.createObjectURL(blob as Blob);
                    link.click();
                });
            }
        };
    }

    function handleDownload() {
        if (selectedImage) {
            convertURLtoImage(selectedImage, "screenshot.png");
        }
    }

    const handleRemoveFavorite = async (_id: string | undefined, imageUrl: string | undefined) => {
        setUploading(true);

        try {
            const response = await fetch(`${process.env.API_URL}/api/favorite/removeARImage?id=${_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: imageUrl,
                }),
            });

            if (response.ok) {

                if (!imageUrl) {
                    throw new Error("imageUrl is undefined");
                }

                const imageNameNonSymbol = imageUrl.match(/([^\/?]+)(?=\?alt)/)?.[1];
                const decodedImageName = decodeURIComponent(imageNameNonSymbol as string);
                const imageName = decodedImageName.split('/')[2];

                const path = `member_images/${_id}/${imageName}`;
                const storageRef = ref(storage, path);
                await deleteObject(storageRef);

                setAlertSuccess(true);
                setIsModalOpen(false);
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
            <Head><title>Favorite | High U</title></Head>
            <Paper className="bg-[#252525] h-screen">
                <Navbar />
                <Snackbar open={alertSuccess} autoHideDuration={5000} onClose={handleCloseAlertSuccess}>
                    <Alert onClose={handleCloseAlertSuccess} severity="success" sx={{ width: '100%' }}>
                        Remove Favorite Success!
                    </Alert>
                </Snackbar>
                <Snackbar open={alertError} autoHideDuration={5000} onClose={handleCloseAlertError}>
                    <Alert onClose={handleCloseAlertError} severity="error" sx={{ width: '100%' }}>
                        Can't Remove Favorite!
                    </Alert>
                </Snackbar>
                <Container maxWidth="xl" >
                    <UserHeader />
                    <Box className="w-full py-6" sx={{ typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box className="border-b border-[#886828]">
                                <TabList onChange={handleChange} aria-label="Favorite Menu">
                                    <Tab label="My Favorite Wigs" className="text-[#F0CA83] font-bold" value="1" />
                                    <Tab label="My AR Images" className="text-[#F0CA83] font-bold" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Grid container spacing={3} className="mb-8">
                                    {favoriteWigsList.length ? (
                                        favoriteWigsList.map((item, i) => (
                                            <Grid key={i} item xs={4} sm={3} md={2}>
                                                <Link href={`/Wig/${item._id}`}>
                                                    <Card variant="outlined" className="content" sx={{ maxWidth: 'auto', }} >
                                                        <CardActionArea>
                                                            <div className="content-overlay" />
                                                            <Image
                                                                src={item.main_image}
                                                                alt={item.title}
                                                                width={525}
                                                                height={700}
                                                                className="w-80 h-auto object-cover"
                                                                priority
                                                            />
                                                            <CardContent className="content-details fadeIn-bottom">
                                                                <Typography gutterBottom component="div" className="text-white font-bold text-base mb-2">
                                                                    {item.title}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                </Link>
                                            </Grid>
                                        ))
                                    ) : (
                                        <Grid item xs={12}>
                                            <Box className="mt-36">
                                                <center>
                                                    <EmptyFavorite />
                                                </center>
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2" >
                                <Grid container spacing={3} className="mb-8">
                                    {favoriteARImage.length ? (
                                        favoriteARImage.map((item, i) => (
                                            <Grid key={i} item xs={6} sm={4} md={3}>
                                                <Card variant="outlined" className="content" sx={{ maxWidth: 'auto', }}>
                                                    <CardActionArea onClick={() => handleClickImage(item.image)}>
                                                        <Image
                                                            src={item.image}
                                                            alt="image ar"
                                                            width={525}
                                                            height={525}
                                                            className="w-[525px] h-auto object-cover hover:opacity-90 transition"
                                                            priority
                                                        />
                                                    </CardActionArea>
                                                </Card>
                                            </Grid>
                                        ))
                                    ) : (
                                        <Box className="mt-36">
                                            <center>
                                                <EmptyARImage />
                                            </center>
                                        </Box>
                                    )}
                                    <Modal
                                        className="p-4 fixed top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center"
                                        open={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
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
                                                {selectedImage && (
                                                    <Image
                                                        src={selectedImage}
                                                        alt="Screenshot"
                                                        className="border-[12px] border-[#646464] rounded w-[650px] h-[650px] object-center object-cover"
                                                        width={650}
                                                        height={650}
                                                    />
                                                )}
                                                <Tooltip title="Remove Favorite">
                                                    <IconButton
                                                        className={isHoverFavBtn ? "mx-1 mt-2 bg-[#555555] text-white font-bold duration-200" : "bg-red-400 mx-1 mt-2 text-white font-bold duration-200"}
                                                        onMouseEnter={handleMouseEnter}
                                                        onMouseLeave={handleMouseLeave}
                                                        onClick={() => handleRemoveFavorite(member?._id, selectedImage as string)}
                                                    >
                                                        {isHoverFavBtn ? <HeartBrokenIcon /> : <FavoriteIcon />}
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
                                                        onClick={() => setIsModalOpen(false)}
                                                    >
                                                        <ClearIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </>
                                    </Modal>
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Container>
            </Paper>
        </ThemeProvider>
    );
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: './',
                permanent: false,
            },
        }
    }

    return {
        props: { session },
    }
}
