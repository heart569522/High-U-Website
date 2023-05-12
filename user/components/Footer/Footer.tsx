import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Link from 'next/link';

function Copyright() {
    return (
        <Typography variant="body2" color="#F0CA83" sx={{ fontFamily: 'Prompt, sans-serif', }}>
            {'Copyright © '}
            <Link color="inherit" href="/" className="underline">
                HIGH U {' '}{new Date().getFullYear()}
            </Link>
            {'.'} We love our users!
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: "#303030",
                color: "#F0CA83",
                textAlign: 'center',
            }}
        >
            <Typography textAlign="center" variant="h4" className="tracking-widest" sx={{ fontFamily: 'Prompt, sans-serif', fontWeight: 'bold', pb: 3 }}>
                HIGH-U
            </Typography>
            
            <IconButton href='#' size="large" aria-label="facebook" sx={{ color: '#F0CA83', fontSize: '24px', }}>
                <FacebookOutlinedIcon />
            </IconButton>
            <IconButton href='#' size="large" aria-label="instagram" sx={{ color: '#F0CA83', }}>
                <InstagramIcon />
            </IconButton>
            <IconButton href='#' size="large" aria-label="youtube" sx={{ color: '#F0CA83', }}>
                <YouTubeIcon />
            </IconButton>
            <IconButton href='#' size="large" aria-label="tel" sx={{ color: '#F0CA83', }}>
                <LocalPhoneIcon />
            </IconButton>
            <Copyright />
        </Box>
    );
}