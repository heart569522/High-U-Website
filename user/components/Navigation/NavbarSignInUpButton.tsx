import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
import { Box } from '@mui/material';

function NavbarSignInUpButton() {
    const router = useRouter()
    const handleMenuItemClick = (path: string) => {
        router.push(path)
    }

    return (
        <Box className='flex justify-end items-center'>
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
                    className="font-bold bg-[#F0CA83] hover:bg-[#cf9d40]"
                    onClick={() => handleMenuItemClick('/user/SignUp')}
                    variant="contained"
                >
                    signup
                </Button>
            </Stack>
        </Box>
    )
}

export default NavbarSignInUpButton;
