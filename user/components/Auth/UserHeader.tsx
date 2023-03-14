import * as React from 'react';
import {
    Typography,
    Box,
    Grid,
    Skeleton
} from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import Image from 'next/image';

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


export default function UserHeader() {
    const { data: session, status } = useSession();
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(status === 'loading');
    }, [status]);

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
                                src={session?.user?.image || ''}
                                alt={session?.user?.name || ''}
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
                                {session?.user?.name || ''}
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
