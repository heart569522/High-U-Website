import * as React from 'react';
import {
    Typography,
    Box,
    Grid,
    Skeleton
} from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

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

interface User {
    _id: string;
    image: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
}


export default function UserHeader() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`${process.env.API_URL}/api/user_data/getUserData`);
                setUser(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item className="pt-8 inline-flex">
                    <Box sx={{ mr: 2 }}>
                        {loading ? (
                            <Skeleton
                                animation="wave"
                                variant="circular"
                                className="w-36 h-36 bg-[#f0ca8350] rounded-full"
                            />
                        ) : (
                            <Image
                                className="w-36 h-36 rounded-full object-cover"
                                width={144}
                                height={144}
                                src={user?.image || ''}
                                alt={user?.username || ''}
                            />
                        )}
                    </Box>
                    <Box>
                        {loading ? (
                            <Skeleton
                                animation="wave"
                                variant="text"
                                className="w-full ml-4 px-6 pt-8 text-5xl bg-[#f0ca8350] rounded-md"
                            />
                        ) : (
                            <Typography
                                variant="h4"
                                className="text-[#F0CA83] font-bold px-6 pt-8 max-sm:text-[28px]"
                            >
                                {user?.username || ''}
                            </Typography>
                        )}
                        {loading ? (
                            <Skeleton
                                animation="wave"
                                variant="text"
                                className="w-full ml-4 px-6 pt-8 text-base bg-[#f0ca8350] rounded-md"
                            />
                        ) : (
                            <Typography variant="h6" className="text-[#F0CA83] px-6 pb-8">
                                Member
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
