import { useEffect, useRef, useState } from 'react'
import {
    Box,
    Typography,
    Grid,
    Button,
    Tooltip,
    Paper,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Breadcrumbs,
    Stack,
    Chip,
    IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/Favorite';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import Navbar from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import Link from 'next/link';
import cache from 'memory-cache';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';

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
    view: number;
    favorite: number;
    use: number;
}

type GetOneWigRequest = {
    id: string;
}

type GetOneWigResponse = ResponseFromServer;

type ResponseFromServer = Wig;

type FavoriteState = {
    [wigId: string]: boolean
}

type Member = {
    _id: string
}


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

        const response = await fetch(`${process.env.API_URL}/api/wig_data/getOneWig?id=` + request.id)

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
                    view: responseFromServer.view,
                    favorite: responseFromServer.favorite,
                    use: responseFromServer.use

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
                    desc: '',
                    view: 0,
                    favorite: 0,
                    use: 0
                }
            }
        }
    }
}

export async function getStaticPaths() {
    let wigs = await fetch(`${process.env.API_URL}/api/wig_data/getAllWigs`);

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

export default function WigDetail({ wig: { _id, ar_image, main_image, sub_image, title, style, type, color, size, price, desc, view, favorite, use } }: ContentPageProps) {

    const [wigsData, setWigsData] = useState<Wig[]>([]);

    const [isFavorite, setIsFavorite] = useState<FavoriteState>({});
    const { data: session } = useSession()
    const router = useRouter()
    const [member, setMember] = useState<Member | null>(null);

    useEffect(() => {
        async function fetchWigsData() {
            try {
                const response = await fetch(`${process.env.API_URL}/api/wig_data/getAllWigs`);
                const data = await response.json();
                setWigsData(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchWigsData();
    }, []);

    const wigsWithValidArImage = wigsData.filter(wig => wig._id === _id && wig.ar_image !== null);
    const hasWigsWithValidArImage = wigsWithValidArImage.length > 0;
    console.log(hasWigsWithValidArImage);


    async function addViewToWig(wigId: string): Promise<void> {
        const response = await fetch(`${process.env.API_URL}/api/wig_data/addViewWig`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: wigId }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    }

    useEffect(() => {
        addViewToWig(_id);
    }, [_id]);

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
        const fetchFavoriteWigs = async () => {
            if (!member) return;

            try {
                const favorites = await axios.get(`${process.env.API_URL}/api/favorite/getFavoriteData?member_id=${member._id}`);

                const favoriteState = favorites.data.reduce((acc: FavoriteState, favorite: any) => {
                    const wigId = favorite.wig_id.toString(); // Convert wig ID to string for indexing
                    acc[wigId] = true;
                    return acc;
                }, {});

                setIsFavorite(favoriteState);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFavoriteWigs();
    }, [member]);

    const handleToggleFavorite = async (wigId: string) => {
        if (!session) {
            router.push("/SignIn");
            return;
        }

        try {
            const apiUrl = `${process.env.API_URL}/api/favorite/favoriteWig?id=${member?._id}`;

            // Check if the wig is already marked as favorite
            if (isFavorite[wigId]) {
                // Remove the wig from the database
                const res = await fetch(apiUrl, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        member_id: member?._id,
                        wig_id: wigId,
                    }),
                });

                if (res.ok) {
                    // Update the state to reflect that the wig is no longer a favorite
                    setIsFavorite((prevState) => ({
                        ...prevState,
                        [wigId]: false,
                    }));
                } else {
                    // Handle error response from server
                    console.error("Error removing favorite:", res.status);
                }
            } else {
                // Add the wig to the database
                const res = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        member_id: member?._id,
                        wig_id: wigId,
                    }),
                });

                if (res.ok) {
                    // Update the state to reflect that the wig is now a favorite
                    setIsFavorite((prevState) => ({
                        ...prevState,
                        [wigId]: true,
                    }));
                } else {
                    // Handle error response from server
                    console.error("Error adding favorite:", res.status);
                }
            }
        } catch (error) {
            // Handle fetch error
            console.error("Error toggling favorite:", error);
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <Head><title>{title} | High U</title></Head>
            <Navbar />
            <Paper sx={{ backgroundColor: '#faf7f7', paddingTop: 4, paddingBottom: 2 }}>
                <Container maxWidth="xl" >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box className="flex justify-between">
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
                                <Stack direction="row" spacing={1} className='py-1'>
                                    <Tooltip title="View">
                                        <Chip icon={<RemoveRedEyeIcon />} label={view.toFixed(0)} />
                                    </Tooltip>
                                    <Tooltip title="Favorite">
                                        <Chip icon={<FavoriteIcon />} label={favorite} />
                                    </Tooltip>
                                </Stack>
                            </Box>

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
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={6} className="mt-8 max-sm:text-center">
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        className={`p-3 ${isFavorite[_id] ? 'bg-red-400 hover:bg-red-500 ' : 'bg-gray-400 hover:bg-gray-500 text-gray-800'
                                            }`}
                                        onClick={() => handleToggleFavorite(_id)}
                                    >
                                        {isFavorite[_id] ?
                                            <Typography className='tracking-wider font-bold text-xl max-lg:text-lg max-sm:text-[16px] text-white'>Your&nbsp;Favorite</Typography>
                                            :
                                            <Typography className='tracking-wider font-bold text-xl max-lg:text-lg max-sm:text-[16px] text-white'>Add&nbsp;to&nbsp;Favorite</Typography>
                                        }
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} className="mt-8 max-sm:text-center">
                                    {hasWigsWithValidArImage ? (
                                        <Link href="/TryAR">
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                className="p-3 tracking-wider bg-[#F0CA83] hover:bg-[#e9aa35] text-white font-bold text-xl max-lg:text-lg max-sm:text-[16px]"
                                            >
                                                Try&nbsp;AR
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            disableTouchRipple
                                            className="p-3 tracking-wider bg-gray-400 hover:bg-gray-500 text-white font-bold text-xl max-lg:text-lg max-sm:text-[16px]"
                                        >
                                            No&nbsp;AR
                                        </Button>
                                    )}
                                </Grid>
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
                        {wigsData
                            .filter((wig) => wig._id !== _id)
                            .sort(() => Math.random() - 0.5) // Shuffle the array randomly
                            .slice(0, 4) // Select the first 4 elements
                            .map((item, i) =>
                                <Grid key={i} item xs={6} sm={6} md={3}>
                                    <Link href={`./[id]`} as={`./${item._id}`} target='_parent'>
                                        <Card variant="outlined" className="content" sx={{ maxWidth: 'auto', }}>
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
