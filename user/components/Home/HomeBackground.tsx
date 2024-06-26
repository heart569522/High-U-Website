import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { useEffect } from 'react';

const bgHome = 'https://images.squarespace-cdn.com/content/v1/557dc7afe4b0452ec69dc879/1539722002377-ZS55K8YB3D1ZN31RN3NC/hair+models.png?format=2500w';
const bgCut = 'https://firebasestorage.googleapis.com/v0/b/high-u.appspot.com/o/asset%2Fhome%2Fmodel_overlay.png?alt=media&token=ec1bd66f-6f24-4066-9ab8-fcd6405ed699'
const bgCutLocal = '../model_overlay.png'

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '2.2rem',
  '@media (min-width:600px)': {
    fontSize: '2.7rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3.2rem',
    color: 'white',
  },
};


export default function HomeBackground() {

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ position: 'relative', height: '90vh', overflowX: 'hidden' }}>
        <Box
          sx={{
            backgroundColor: '#9F9289',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
        >
          <Box
            // id="bg-image"
            data-aos="fade-left"
            sx={{
              backgroundImage: `url(${bgCutLocal || bgCut})`,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -2,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundAttachment: 'scroll',
            }}
          >
          </Box>
          <Box className="flex justify-start">
            <Typography
              variant="h3"
              className='colorTextGold font-bold absolute max-[460px]:text-3xl'
              sx={{
                width: '555',
                left: '8vh',
                top: '320px',
                fontFamily: 'Prompt, sans-serif',
              }}
            data-aos="fade-zoom-in"
            >
              a Day of Beauty, <br /> a Day of Care, <br /> a Day of Happiness.
            </Typography>
          </Box>
        </Box>
      </Box>

    </ThemeProvider >
  )
}