import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function NavbarLoginRegisButton() {
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
                    href='/Login' 
                    variant="outlined"
                >
                Login
                </Button>
                <Button 
                    sx={{ 
                        backgroundColor: '#F0CA83',
                        '&:hover': {
                            backgroundColor: '#cf9d40',
                          }, 
                        fontWeight: 'bold'
                    }} 
                    href='#' 
                    variant="contained"
                >
                Register
                </Button>
            </Stack>
        </Grid>
    )
}

export default NavbarLoginRegisButton;
