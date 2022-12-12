import * as React from 'react';
import { Paper, Typography, } from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';

const bgHome = 'https://images.squarespace-cdn.com/content/v1/557dc7afe4b0452ec69dc879/1539722002377-ZS55K8YB3D1ZN31RN3NC/hair+models.png?format=2500w';

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
      <Paper
        sx={{
          backgroundImage: `url(${bgHome})`,
          height: '90vh',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'scroll',
        }}
      >
        <Typography
          variant="h3"
          className='colorTextGold'
          sx={{
            position: 'absolute',
            width: '555',
            left: '8vh',
            top: '400px',
            fontWeight: 'bold',
            fontFamily: 'Prompt, sans-serif',
          }}
        >
          a Day of Beauty, <br /> a Day of Care, <br /> a Day of Happiness.
        </Typography>
      </Paper>
    </ThemeProvider>      
  )
}