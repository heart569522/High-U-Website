import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
} from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';

import Wig_Product from '../../helper/Wig_Product.json';

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

export default function HomeContent() {
  const router = useRouter()

  const handleMenuItemClick = (path: string) => {
    router.push(path)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="bg-[#303030] h-max py-10">
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12} sm={6} className="flex items-center justify-end max-sm:justify-center" data-aos="fade-right">
              <img
                className="w-full max-w-lg p-3"
                src="https://t4.ftcdn.net/jpg/04/27/41/05/360_F_427410504_H6zGuHXoNdaH7Ghwpou1dXgbODusZeAg.jpg"
              />
            </Grid>
            <Grid item xs={12} sm={6} className="flex items-center text-left max-sm:text-center" data-aos="fade-left">
              <Typography
                className="text-2xl px-3 max-sm:text-lg"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="bg-[#787878] h-max py-10">
        <Container maxWidth="xl">
          <Grid container className="max-sm:flex-wrap-reverse">
            <Grid item xs={12} sm={6} className="flex items-center text-right max-sm:text-center" data-aos="fade-right">
              <Typography
                className="text-2xl p-3 max-sm:text-lg"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className="flex items-center justify-start max-sm:justify-center " data-aos="fade-left">
              <img
                className="w-full max-w-lg px-3"
                src="https://t4.ftcdn.net/jpg/04/27/41/49/360_F_427414979_2GhGAcGPFFUwfANjcpurjis6lVrU45Bx.jpg"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CARD 4 IMAGE */}
      <Box className="bg-[#c0b7a7] h-max">
        <Box className="colorBackgroundContentGold h-max py-10">
          <Container maxWidth="xl">
            <Grid container spacing={3} className="mb-8">
              {
                Wig_Product.slice(0, 4).map((item, i) =>
                  <Grid key={i} item xs={6} sm={6} md={3}>
                    <Link href="/user/WigProduct">
                      <Card variant="outlined" className="content rounded-lg" sx={{ maxWidth: 'auto', }} data-aos="fade-up">
                        <CardActionArea>
                          <div className="content-overlay" />
                          <CardMedia
                            className="content-image"
                            component="img"
                            image={item.image}
                          />
                          <CardContent className="content-details fadeIn-bottom">
                            <Typography gutterBottom component="div" className="text-white font-bold text-md mb-2">
                              {item.title}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                )
              }
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>

  )
}
