import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'

function NavbarSignInUpButton() {
    const router = useRouter()
    const handleMenuItemClick = (path: string) => {
        router.push(path)
    }

    return (
        <Grid>
            {/* Login , Register Button */}
            <Stack sx={{ paddingLeft: 1 }} spacing={1} direction="row">
                <Button
                    sx={{
                        color: '#F0CA83',
                        borderColor: '#F0CA83',
                        '&:hover': {
                            borderColor: '#ad7c21',
                            backgroundColor: '#cf9d4005',
                        },
                        fontWeight: 'bold'
                    }}
                    onClick={() => handleMenuItemClick('/user/SignIn')}
                    variant="outlined"
                >
                    signin
                </Button>
                <Button
                    // sx={{
                    //     backgroundColor: '#F0CA83',
                    //     '&:hover': {
                    //         backgroundColor: '#cf9d40',
                    //     },
                    //     fontWeight: 'bold'
                    // }}
                    className="font-bold bg-[#F0CA83] hover:bg-[#cf9d40]"
                    onClick={() => handleMenuItemClick('/user/SignUp')}
                    variant="contained"
                >
                    signup
                </Button>
            </Stack>
        </Grid>
    )
}

export default NavbarSignInUpButton;
