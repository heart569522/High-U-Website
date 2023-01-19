import React, { useState, useEffect  } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Aos from 'aos';
import 'aos/dist/aos.css';
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

  useEffect(() => {
    Aos.init({
      duration : 2000
    })
  }, []);

  useEffect(() => {
    Aos.refresh();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box className="bg-[#303030] h-max py-10">
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12} sm={6} className="flex items-center justify-end max-sm:justify-center" data-aos="fade-up">
              <img
                className="w-full max-w-lg p-3"
                src="https://t4.ftcdn.net/jpg/04/27/41/05/360_F_427410504_H6zGuHXoNdaH7Ghwpou1dXgbODusZeAg.jpg"
              />
            </Grid>
            <Grid item xs={12} sm={6} className="flex items-center text-left max-sm:text-center" data-aos="fade-up">
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
            <Grid item xs={12} sm={6} className="flex items-center text-right max-sm:text-center" data-aos="fade-up">
              <Typography
                className="text-2xl p-3 max-sm:text-lg"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className="flex items-center justify-start max-sm:justify-center " data-aos="fade-up">
              <img
                className="w-full max-w-lg px-3"
                src="https://t4.ftcdn.net/jpg/04/27/41/49/360_F_427414979_2GhGAcGPFFUwfANjcpurjis6lVrU45Bx.jpg"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CARD 3 IMAGE */}
      <Box className="bg-[#c0b7a7] h-max">
        <Box className="colorBackgroundContentGold h-max py-10">
          <Container maxWidth="xl">
            <Grid container spacing={5}>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image="https://cdn.shopify.com/s/files/1/1410/9094/products/rwupstage_01_lg_1_600x600.jpg?v=1668795994"
                    />
                    <CardContent>
                      <Typography className="text-lg font-bold max-lg:text-base max-md:text-sm max-sm:text-base">
                        Upstage | Synthetic Lace Front Wig (Hand-Tied)
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image="https://cdn.shopify.com/s/files/1/1410/9094/products/0004_Always_-_2_600x600.jpg?v=1619614043"
                    />
                    <CardContent>
                      <Typography className="text-lg font-bold max-lg:text-base max-md:text-sm max-sm:text-base">
                        Always | HF Synthetic Wig (Basic Cap)
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image="https://cdn.shopify.com/s/files/1/1410/9094/products/resized__0001_ew_perucci2020_Tab_6_600x600.jpg?v=1648244990"
                    />
                    <CardContent>
                      <Typography className="text-lg font-bold max-lg:text-base max-md:text-sm max-sm:text-base">
                        Tab | Synthetic Lace Front Wig (Mono Crown)
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image="https://cdn.shopify.com/s/files/1/1410/9094/products/Resized_VivicaFox__0001_LAPIS_NATURAL_M.jpg?v=1609790920"
                    />
                    <CardContent>
                      <Typography className="text-lg font-bold max-lg:text-base max-md:text-sm max-sm:text-base">
                        Lapis | Human Hair Lace Front Wig
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <center>
                  <Link href="/user/Wig">
                    <Button className="text-[#303030] shadow border-[#303030] font-bold bg-[#FFCF76] hover:bg-[#ffbd44] focus:ring-4 focus:outline-none focus:ring-[#805e00] rounded text-sm px-5 py-2.5 text-center inline-flex items-center">
                      See More
                      <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Button>
                  </Link>
                </center>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>

  )
}
