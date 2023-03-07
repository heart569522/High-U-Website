import * as React from 'react';
import {
    Typography,
    Box,
    Grid,
    Tooltip,
    IconButton,
    Skeleton
} from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';

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
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch data
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, [loading]);

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item className="pt-8 inline-flex">
                    {loading ? (<Skeleton animation="wave" variant="rounded" className="w-36 h-36 bg-[#f0ca8350] rounded-full" />) : (
                        <Box>
                            <img className="w-36 h-36 rounded-full object-cover" src="../test.png" alt="" />
                        </Box>
                    )}
                    <Box>
                    {loading ? (<Skeleton animation="wave" variant="text" className="w-full ml-4 px-6 pt-8 text-5xl bg-[#f0ca8350] rounded-md" />) : (
                        <Typography variant='h4' className="text-[#F0CA83] font-bold px-6 pt-8 max-sm:text-[28px]">
                            Matther Alonzo
                        </Typography>
                    )}
                    {loading ? (<Skeleton animation="wave" variant="text" className="w-full ml-4 px-6 pt-8 text-base bg-[#f0ca8350] rounded-md" />) : (
                        <Typography variant='h6' className="text-[#F0CA83] px-6 pb-8">
                            Member
                        </Typography>
                    )}
                    </Box>
                    {/* <Box className="">
                        <Tooltip title="Sign Out">
                            <IconButton className=" my-10 bg-[#F0CA83] text-black font-bold duration-200 hover:bg-red-500 hover:text-white">
                                <LogoutIcon fontSize='large' />
                            </IconButton>
                        </Tooltip>
                    </Box> */}
                </Grid>
            </Grid>
        </ThemeProvider>

    );
}
