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

export default function HomeContent() {
  const router = useRouter()

  const handleMenuItemClick = (path: string) => {
    router.push(path)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ overflowX: 'hidden' }}>
        <Box className="bg-[#303030] h-max py-10">
          <Container maxWidth="xl">
            <Grid container>
              <Grid item xs={12} sm={6} className="flex items-center justify-end max-sm:justify-center" data-aos="fade-right">
                <Image
                  className="w-full max-w-lg p-3 rounded-md"
                  src="https://firebasestorage.googleapis.com/v0/b/high-u.appspot.com/o/asset%2Fimage_showcase1.jpg?alt=media&token=dca062ad-7f3e-4e05-bf99-e34906d9fbf3"
                  alt="Image Showcase 1"
                  width={500}
                  height={500}
                  priority
                />
              </Grid>
              <Grid item xs={12} sm={6} className="flex items-center text-left max-sm:text-center" data-aos="fade-left">
                <Typography
                  className="text-2xl px-3 max-sm:text-lg"
                >
                  Discover your new, bold look with our wig collection. From pixie cuts to bobs, our high-quality wigs offer a range of options for every style. Comfortable and natural-looking, change up your look in an instant.
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
                  Discover a new you with our diverse collection of wigs. Find the perfect fit, style, and color to enhance your look. Effortless beauty, comfort, and confidence guaranteed.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className="flex items-center justify-start max-sm:justify-center " data-aos="fade-left">
                <Image
                  className="w-full max-w-lg p-3 rounded-md"
                  src="https://firebasestorage.googleapis.com/v0/b/high-u.appspot.com/o/asset%2Fimage_showcase2.jpg?alt=media&token=3d334a8f-f72f-4b68-b20a-3ddc1acd1ad1"
                  alt="Image Showcase 2"
                  width={500}
                  height={500}
                  priority
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      {/* CARD 4 IMAGE */}
      <Box className="bg-[#c0b7a7] h-max">
        <Box className="colorBackgroundContentGold h-max py-10">
          <Container maxWidth="xl">
            <Grid container spacing={3} className="mb-8">
              {
                Wig_Product.slice(0, 4).map((item, i) =>
                  <Grid key={i} item xs={6} sm={6} md={3}>
                    <Link href="/WigProduct">
                      <Card variant="outlined" className="content rounded-lg" sx={{ maxWidth: 'auto', }} data-aos="fade-zoom-in">
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
            <Grid item xs={12} data-aos="fade-zoom-in">
              <center>
                <Link href="/Wig">
                  <Button className="text-[#303030] shadow border-[#303030] font-bold bg-[#FFCF76] hover:bg-[#ffbd44] focus:ring-4 focus:outline-none focus:ring-[#805e00] rounded text-sm px-5 py-2.5 text-center inline-flex items-center">
                    See More
                    <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </Button>
                </Link>
              </center>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>

  )
}
