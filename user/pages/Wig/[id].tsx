import { useEffect, useRef, useState } from 'react'
import {
    Box,
    Typography,
    Toolbar,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Tooltip,
    IconButton,
    Backdrop,
    CircularProgress,
    Snackbar,
    Alert,
    Paper,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    ImageList,
    ImageListItem,
    Skeleton,
    Breadcrumbs,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { storage } from '../api/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, UploadTaskSnapshot } from 'firebase/storage'
import Head from 'next/head';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import Navbar from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import Link from 'next/link';

const API_URL = "http://localhost:3000"

const theme = createTheme({
    typography: {
        fontFamily: [
            'Prompt, sans-serif'
        ].join(','),
    },
    palette: {
        primary: {
            main: "#F0CA83",
        },
        secondary: {
            main: "#303030"
        }
    },
});

type PageParams = {
    id: string;
}

type ContentPageProps = {
    wig: Wig;
}

type Wig = {
    _id: string;
    ar_image: string;
    main_image: string;
    sub_image: string[];
    title: string;
    style: string;
    type: string;
    color: string;
    size: number[];
    price: number;
    desc: string;
}

type GetOneWigRequest = {
    id: string;
}

type GetOneWigResponse = ResponseFromServer;

type ResponseFromServer = Wig;

import cache from 'memory-cache';

export async function getStaticProps({ params }: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
    console.log('getStaticProps called');
    const cacheKey = `wig_${params?.id}`;
    const cachedData = cache.get(cacheKey);
    console.log('cachedData:', cachedData);
    if (cachedData) {
        console.log('Returning cached data');
        return {
            props: { wig: cachedData }
        }
    }
    try {
        const request: GetOneWigRequest = {
            id: params?.id || ""
        };

        const response = await fetch(`${API_URL}/api/wig_data/getOneWig?id=` + request.id)

        const responseFromServer: GetOneWigResponse = await response.json()
        cache.put(cacheKey, responseFromServer, 60000); // cache for 1 minute

        console.log('Data not found in cache');
        return {
            props: {
                wig: {
                    _id: responseFromServer._id,
                    ar_image: responseFromServer.ar_image,
                    main_image: responseFromServer.main_image,
                    sub_image: responseFromServer.sub_image,
                    title: responseFromServer.title,
                    style: responseFromServer.style,
                    type: responseFromServer.type,
                    color: responseFromServer.color,
                    size: responseFromServer.size,
                    price: responseFromServer.price,
                    desc: responseFromServer.desc,
                }
            }
        }
    } catch (error: any) {
        console.log("error", error.message);
        return {
            props: {
                wig: {
                    _id: '',
                    ar_image: '',
                    main_image: '',
                    sub_image: [],
                    title: '',
                    style: '',
                    type: '',
                    color: '',
                    size: [0],
                    price: 0,
                    desc: ''
                }
            }
        }
    }
}

export async function getStaticPaths() {
    let wigs = await fetch(`${API_URL}/api/wig_data/getAllWigs`);

    let wigFromServer: [Wig] = await wigs.json();

    return {
        paths: wigFromServer.map((wig) => {
            return {
                params: {
                    id: wig._id
                }
            }
        }),
        fallback: false
    }
}

export default function WigDetail({ wig: { _id, ar_image, main_image, sub_image, title, style, type, color, size, price, desc } }: ContentPageProps) {

    const [wigsData, setWigsData] = useState<Wig[]>([]);

    useEffect(() => {
        async function fetchWigsData() {
            try {
                const response = await fetch(`${API_URL}/api/wig_data/getAllWigs`);
                const data = await response.json();
                setWigsData(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchWigsData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Head><title>{title} | High U</title></Head>
            <Navbar />
            <Paper sx={{ backgroundColor: '#faf7f7', paddingTop: 4, paddingBottom: 2 }}>
                <Container maxWidth="xl" >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div role="presentation">
                                <Breadcrumbs aria-label="breadcrumb" className='py-2'>
                                    <Link color="inherit" href="../">
                                        Home
                                    </Link>
                                    <Link
                                        color="inherit"
                                        href="./"
                                    >
                                        Wig List
                                    </Link>
                                    <Typography color="text.primary" aria-current="page">{title}</Typography>
                                </Breadcrumbs>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Image
                                src={main_image}
                                className="max-w-xl w-full rounded-md"
                                alt="main_image"
                                width={525}
                                height={700}
                                priority
                            />
                            <Grid container spacing={2} className='py-3'>
                                <Grid item xs={12} md={12}>
                                    <Swiper
                                        style={{
                                            "--swiper-navigation-color": "#fff",
                                            "--swiper-pagination-color": "#fff",
                                        } as any}
                                        spaceBetween={15}
                                        slidesPerView={3}
                                        navigation={true}
                                        modules={[Navigation]}
                                    >
                                        {sub_image.map((image, i) => (
                                            <SwiperSlide key={i}>
                                                <Image
                                                    src={image}
                                                    alt={`sub_image_${i}`}
                                                    width={525}
                                                    height={700}
                                                    className="w-full object-cover rounded-md"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Typography variant="h4" className="my-2">
                                {title}
                            </Typography>
                            <hr className="mx-auto w-full h-[1px] rounded border-0 bg-gray-400"></hr>
                            <Typography variant="subtitle1" className="text-stone-600 mt-3" >
                                {desc}
                            </Typography>
                            <Grid container className='pt-4' spacing={2}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box className="py-4 flex flex-col justify-center items-center border-2 border-[#555555] rounded-md shadow-md">
                                        <Typography className="text-xl underline">Style</Typography>
                                        <Typography className="text-3xl font-bold pb-10 pt-4">{style}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box className="py-4 flex flex-col justify-center items-center border-2 border-[#555555] rounded-md shadow-md">
                                        <Typography className="text-xl underline">Type</Typography>
                                        <Typography className="text-3xl font-bold pb-10 pt-4">{type}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box className="py-4 flex flex-col justify-center items-center border-2 border-[#555555] rounded-md shadow-md">
                                        <Typography className="text-xl underline">Color</Typography>
                                        <Typography className="text-3xl font-bold pb-10 pt-4">{color}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box className="py-4 flex flex-col justify-center items-center border-2 border-[#555555] rounded-md shadow-md">
                                        <Typography className="text-xl underline">Price</Typography>
                                        <Typography className="text-3xl font-bold pb-10 pt-4">{price.toLocaleString('en-US', { style: 'currency', currency: 'THB' })}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Box className="py-2 flex flex-col justify-center items-center border-2 border-[#555555] rounded-md shadow-md">
                                        <Typography className="text-xl underline">Size&nbsp;(Inch)</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Box className="pt-2 flex flex-col justify-center items-center">
                                                    <Typography className="text-lg">Length</Typography>
                                                    <Typography className="text-3xl font-bold pb-10 pt-4">{size[0]}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Box className="pt-2 flex flex-col justify-center items-center">
                                                    <Typography className="text-lg">Circumference</Typography>
                                                    <Typography className="text-3xl font-bold pb-10 pt-4">{size[1]}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Box className="pt-2 flex flex-col justify-center items-center">
                                                    <Typography className="text-lg">Ear-to-Ear</Typography>
                                                    <Typography className="text-3xl font-bold pb-10 pt-4">{size[2]}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Box className="pt-2 flex flex-col justify-center items-center">
                                                    <Typography className="text-lg">Front-to-Back</Typography>
                                                    <Typography className="text-3xl font-bold pb-10 pt-4">{size[3]}</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item className="mt-8 max-sm:text-center" >
                                <Button variant="contained" className="w-[50%] p-3 bg-red-400 hover:bg-red-500 text-white font-bold text-xl max-lg:text-lg max-sm:text-[16px]">Add&nbsp;to&nbsp;Favorite</Button>
                                <Link href="/TryAR"><Button variant="contained" className="w-[50%] p-3 bg-[#F0CA83] hover:bg-[#e9aa35] text-white font-bold text-xl max-lg:text-lg max-sm:text-[16px]">Try&nbsp;AR</Button></Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <hr data-aos="fade-zoom-in" className="my-10 mx-auto w-full h-[1px] rounded border-0 bg-gray-400"></hr>
                    <Grid container spacing={3} className="mb-8">
                        <Grid item xs={12} >
                            <Typography variant="h5">
                                Recomended
                            </Typography>
                        </Grid>
                        {wigsData.filter((wig) => wig._id !== _id).slice(0, 4).map((item, i) =>
                            <Grid key={i} item xs={6} sm={6} md={3} >
                                <Link href={`./[id]`} as={`./${item._id}`} target='_parent'>
                                    <Card variant="outlined" className="content" sx={{ maxWidth: 'auto', }} >
                                        <CardActionArea>
                                            <div className="content-overlay" />
                                            <Image
                                                className="content-image"
                                                src={item.main_image}
                                                alt="recommend_wig"
                                                width={525}
                                                height={700}
                                            />
                                            <CardContent className="content-details fadeIn-bottom">
                                                <Typography gutterBottom component="div" className="text-white font-bold text-md mb-2">
                                                    {item.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Link>
                            </Grid>
                        )}
                    </Grid>

                </Container>
            </Paper>
            <Footer />
        </ThemeProvider>
    )
}
