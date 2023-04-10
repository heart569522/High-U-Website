import React, { useEffect, useState } from 'react'
import {
  Paper,
  Box,
  Grid,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Skeleton,
  Divider,
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  SwipeableDrawer,
  FormControl,
  InputLabel,
  MenuItem

} from '@mui/material'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { createTheme, CSSObject, styled, Theme, ThemeProvider, useTheme, } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';

import Link from 'next/link'

import EmptyWig from '../../components/Other/EmptyWig';
import Navbar from '../../components/Navigation/Navigation';
import WigBanner from "../../components/Wig/WigBanner"
import Footer from '../../components/Footer/Footer';
import Head from 'next/head';
import Image from 'next/image';

const theme = createTheme({
  palette: {
    primary: {
      main: "#F0CA83",
    },
  },
  typography: {
    fontFamily: [
      'Prompt, sans-serif'
    ].join(','),
  },

});

type Props = {
  wigs: [Wig]
}

type Wig = {
  _id: string;
  ar_image: string;
  main_image: string;
  sub_image: string[];
  title: string;
  style: string;
  type: string;
  color: string;
  size: number[];
  price: number;
  desc: string;
  view: number;
  favorite: number;
  use: number;
  createdAt: string;
}

type Anchor = 'left';

export async function getServerSideProps() {
  try {
    let wigsResponse = await fetch(`${process.env.API_URL}/api/wig_data/getAllWigs`);
    let wigs = await wigsResponse.json();
    return {
      props: { wigs: JSON.parse(JSON.stringify(wigs)) }
    }
  } catch (e) {
    console.error(e);
  }
  return {
    props: { wigs: [] }
  };
}

export default function Wig(props: Props) {
  const [wigData, setWigData] = useState<Wig[]>(props.wigs);
  const [selectSort, setSelectSort] = useState("");
  const [sortedWigData, setSortedWigData] = useState<Wig[]>([]);
  const [hoverWigImage, setHoverWigImage] = useState<string>("");

  const handleSortChange = (event: { target: { value: string; }; }) => {
    setSelectSort(event.target.value as string);
    const value = event.target.value as string;

    let sortedData: Wig[] = [...wigData];

    switch (value) {
      case 'priceHighToLow':
        sortedData = sortedData.sort((a, b) => b.price - a.price);
        break;
      case 'priceLowToHigh':
        sortedData = sortedData.sort((a, b) => a.price - b.price);
        break;
      case 'newestFirst':
        sortedData = sortedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldestFirst':
        sortedData = sortedData.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        break;
    }

    setSortedWigData(sortedData);
  };


  const [state, setState] = useState({ left: false });

  const toggleDrawer = (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Head><title>Wigs | High U</title></Head>
      <Navbar />
      <WigBanner />
      <Paper sx={{ backgroundColor: '#faf7f7', pb: 4, display: 'flex' }}>
        <Container maxWidth="xl" >
          {/* SELECT INPUT */}
          <Grid container spacing={3} alignItems="center" justifyContent="center" className="py-8">
            <Grid item xs={12}>
              <Typography className="text-6xl text-center font-bold max-md:text-5xl max-sm:text-4xl">High-U Wig</Typography>
              <Divider className="py-4 w-full" />
              <Box className="flex justify-between">
                {(['left'] as const).map((anchor, i) => (
                  <Box className="pt-6" key={i}>
                    <Button className="bg-[#F0CA83] hover:bg-[#ffc457] px-3 py-2 text-[#303030] font-bold" onClick={toggleDrawer(anchor, true)}>Show&nbsp;Filters</Button>
                    <SwipeableDrawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                      onOpen={toggleDrawer(anchor, true)}
                    >
                      {list(anchor)}
                    </SwipeableDrawer>
                  </Box>
                ))}
                <Box className="w-[200px] items-center pt-6">
                  <FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectSort}
                      label="Sorting"
                      onChange={handleSortChange}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="priceHighToLow">Price&nbsp;High&nbsp;to&nbsp;Low</MenuItem>
                      <MenuItem value="priceLowToHigh">Price&nbsp;Low&nbsp;to&nbsp;High</MenuItem>
                      <MenuItem value="newestFirst">Newest&nbsp;First</MenuItem>
                      <MenuItem value="oldestFirst">Oldest&nbsp;First</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* WIG PRODUCT */}
          <Grid container spacing={2}>
            {(sortedWigData.length > 0 ? sortedWigData : wigData).map((item, i) => (
              <Grid item xs={6} sm={4} md={3} key={i} className="flex items-center justify-center">
                <Link href="/WigProduct">
                  <Card variant="outlined" sx={{ maxWidth: 320 }}>
                    <CardActionArea>
                      <Image
                        className={`transition duration-400 ease-in-out hover:opacity-90`}
                        src={hoverWigImage === item.sub_image[0] ? item.sub_image[0] : item.main_image}
                        alt={item.title}
                        width={500}
                        height={700}
                        priority
                        onMouseOver={() => setHoverWigImage(item.sub_image[0])}
                        onMouseOut={() => setHoverWigImage("")}
                      />
                      <CardContent>
                        <Typography gutterBottom component="div" className="text-base mb-2 max-sm:text-xs">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" className="flex justify-end font-bold text-base max-sm:text-xs">
                          {item.price?.toLocaleString()}&nbsp;฿
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
            {!sortedWigData && (
              <Grid item xs={12} className="flex items-center justify-center my-10">
                <center><EmptyWig /></center>
              </Grid>
            )}
          </Grid>



        </Container>
      </Paper>
      <Footer />
    </ThemeProvider>

  )
}