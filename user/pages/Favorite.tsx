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
    CardMedia,
    CardContent,
    CardActionArea,
} from '@mui/material';
import {
    TabContext,
    TabList,
    TabPanel,
} from '@mui/lab';
import { createTheme, ThemeProvider, } from '@mui/material/styles';

import Navbar from "../components/Navigation/Navigation"
import UserHeader from '../components/Auth/UserHeader';
import EmptyARImage from '../components/Other/EmptyARImage';
import Head from 'next/head';
import { getSession, GetSessionParams } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import EmptyFavorite from '@/components/Other/EmptyFavorite';

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

const API_URL = "http://localhost:3000"

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

export default function Favorite() {
    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const [favoriteWigs, setFavoriteWigs] = useState<FavoriteState>({});
    const [member, setMember] = useState<Member | null>(null);
    const [wigs, setWigs] = useState<Wig[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/user_data/getUserData`);
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
                const favorites = await axios.get(`${API_URL}/api/favorite/getFavoriteData?member_id=${member._id}`);

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
        const fetchWigs = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/wig_data/getAllWigs`);
                setWigs(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWigs();
    }, []);

    const favoriteWigIds = Object.keys(favoriteWigs);
    const favoriteWigsList = wigs.filter((wig) => favoriteWigIds.includes(wig._id));

    return (
        <ThemeProvider theme={theme}>
            <Head><title>Favorite | High U</title></Head>
            <Paper className="bg-[#252525] h-screen">
                <Navbar />
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
                                        favoriteWigsList.map((wig, i) => (
                                            <Grid key={i} item xs={4} sm={3} md={2}>
                                                <Link href={`/Wig/${wig._id}`}>
                                                    <Card variant="outlined" className="content" sx={{ maxWidth: 'auto', }} >
                                                        <CardActionArea>
                                                            <div className="content-overlay" />
                                                            <Image
                                                                src={wig.main_image}
                                                                alt={wig.title}
                                                                width={525}
                                                                height={700}
                                                            />
                                                            <CardContent className="content-details fadeIn-bottom">
                                                                <Typography gutterBottom component="div" className="text-white font-bold text-base mb-2">
                                                                    {wig.title}
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
                                <Box className="mt-36">
                                    <center>
                                        <EmptyARImage />
                                    </center>
                                </Box>
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
