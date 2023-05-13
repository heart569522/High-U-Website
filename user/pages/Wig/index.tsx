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
  MenuItem,
  Stack,
  Pagination,
  Checkbox,
  IconButton,
  Drawer,
  Tooltip,
  Chip

} from '@mui/material'
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link'
import EmptyWig from '../../components/Other/EmptyWig';
import Navbar from '../../components/Navigation/Navigation';
import WigBanner from "../../components/Wig/WigBanner"
import Footer from '../../components/Footer/Footer';

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios';

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

interface Filters {
  length: {
    min?: number;
    max?: number;
  };
  color: string;
  type: string;
  [key: string]: any;
}

type FavoriteState = {
  [wigId: string]: boolean
}

type Member = {
  _id: string
}

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

const drawerWidth = 240;

const DrawerHeader = styled('div')(() => ({
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Wig(props: Props) {
  const [wigData, setWigData] = useState<Wig[]>(props.wigs);
  const [selectSort, setSelectSort] = useState("");
  const [sortedWigData, setSortedWigData] = useState<Wig[]>([]);
  const [hoverWigImage, setHoverWigImage] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<FavoriteState>({});
  const { data: session } = useSession()
  const router = useRouter()

  const [page, setPage] = useState(1);
  const pageSize = 12;
  const pageCount = Math.ceil(sortedWigData.length / pageSize);

  const [filters, setFilters] = useState<Filters>({
    length: { min: undefined, max: undefined },
    color: '',
    type: '',
  });

  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/api/user_data/getUserData`);
        setMember(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchFavoriteWigs = async () => {
      if (!member) return;

      try {
        const favorites = await axios.get(`${process.env.API_URL}/api/favorite/getFavoriteData?member_id=${member._id}`);

        const favoriteState = favorites.data.reduce((acc: FavoriteState, favorite: any) => {
          const wigId = favorite.wig_id.toString(); // Convert wig ID to string for indexing
          acc[wigId] = true;
          return acc;
        }, {});

        setIsFavorite(favoriteState);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoriteWigs();
  }, [member]);

  const handleToggleFavorite = async (wigId: string) => {
    if (!session) {
      router.push("/SignIn");
      return;
    }

    try {
      const apiUrl = `${process.env.API_URL}/api/favorite/favoriteWig?id=${member?._id}`;

      // Check if the wig is already marked as favorite
      if (isFavorite[wigId]) {
        // Remove the wig from the database
        const res = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            member_id: member?._id,
            wig_id: wigId,
          }),
        });

        if (res.ok) {
          // Update the state to reflect that the wig is no longer a favorite
          setIsFavorite((prevState) => ({
            ...prevState,
            [wigId]: false,
          }));
        } else {
          // Handle error response from server
          console.error("Error removing favorite:", res.status);
        }
      } else {
        // Add the wig to the database
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            member_id: member?._id,
            wig_id: wigId,
          }),
        });

        if (res.ok) {
          // Update the state to reflect that the wig is now a favorite
          setIsFavorite((prevState) => ({
            ...prevState,
            [wigId]: true,
          }));
        } else {
          // Handle error response from server
          console.error("Error adding favorite:", res.status);
        }
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error toggling favorite:", error);
    }
  };

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleSortChange = (event: { target: { value: string; }; }) => {
    setSelectSort(event.target.value as string);
    const value = event.target.value as string;

    let sortedData: Wig[] = [...wigData];

    // Apply filters
    sortedData = sortedData.filter((wig) => {
      if (filters.length.min !== undefined && wig.size[0] < filters.length.min) {
        return false;
      }
      if (filters.length.max !== undefined && wig.size[0] > filters.length.max) {
        return false;
      }
      if (filters.color !== '' && wig.color !== filters.color) {
        return false;
      }
      if (filters.type !== '' && wig.type !== filters.type) {
        return false;
      }
      return true;
    });

    // Apply sorting
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

  const handleResetFilters = () => {
    setFilters({
      length: { min: undefined, max: undefined },
      color: '',
      type: '',
    });
  };

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleFilterChange = (filterType: string, value: string | number, isChecked: boolean) => {
    setFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };
      switch (filterType) {
        case 'size':
          let minLength: number | undefined, maxLength: number | undefined;
          const stringValue = value.toString(); // cast to string
          if (stringValue === 'Short') {
            minLength = 0;
            maxLength = 10;
          } else if (stringValue === 'Medium') {
            minLength = 11;
            maxLength = 17;
          } else if (stringValue === 'Long') {
            minLength = 18;
            maxLength = undefined;
          }
          updatedFilters.length = { min: minLength || 0, max: maxLength || Number.MAX_VALUE };
          break;
        case 'color':
          updatedFilters.color = value.toString();
          break;
        case 'type':
          updatedFilters.type = value.toString();
          break;
        default:
          break;
      }
      if (isChecked) {
        return updatedFilters;
      } else {
        // If a checkbox is unchecked, remove its value from filters
        return Object.keys(updatedFilters).reduce((acc: any, key: string) => {
          if (key !== filterType) {
            acc[key] = updatedFilters[key];
          }
          return acc;
        }, {});
      }
    });
  };

  useEffect(() => {
    const filteredData = wigData.filter((item) => {
      const { length, color, type } = filters;

      const wigSize = item.size[0];
      if (
        length &&
        typeof length.min !== 'undefined' &&
        typeof length.max !== 'undefined' &&
        (wigSize < length.min || wigSize > length.max)
      ) {
        return false;
      }

      if (color && color !== item.color.toString()) {
        return false;
      }

      if (type && type !== item.type) {
        return false;
      }

      return true;
    });

    setSortedWigData(filteredData);
  }, [filters, wigData]);

  const uniqueColors = Array.from(new Set(wigData.map((wig) => wig.color)));
  const uniqueTypes = Array.from(new Set(wigData.map((wig) => wig.type)));

  const list = (
    <Box
      role="presentation"
    >
      <List>
        <ListItem>
          <Typography variant="h6" className="font-bold" sx={{ letterSpacing: '.1rem', }}>
            Length
          </Typography>
        </ListItem>
        {['Short', 'Medium', 'Long'].map((text, i) => (
          <ListItem key={i} disablePadding>
            <Checkbox
              checked={
                filters.length.min === (text === 'Short' ? 0 : text === 'Medium' ? 11 : text === 'Long' ? 18 : undefined)
              }
              onChange={() => handleFilterChange('size', text, true)}
              color="primary"
              sx={{ color: '#F0CA83' }}
            />
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Divider className='bg-[#F0CA83] my-3' />
        <ListItem>
          <Typography variant="h6" className="font-bold" sx={{ letterSpacing: '.1rem', }}>
            Color
          </Typography>
        </ListItem>
        {uniqueColors.map((text, i) => (
          <ListItem key={i} disablePadding>
            <Checkbox
              checked={filters.color === text}
              onChange={() => handleFilterChange('color', text, true)}
              color="primary"
              sx={{ color: '#F0CA83' }}
            />
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Divider className='bg-[#F0CA83] my-3' />
        <ListItem>
          <Typography variant="h6" className="font-bold" sx={{ letterSpacing: '.1rem', }}>
            Type
          </Typography>
        </ListItem>
        {uniqueTypes.map((type, i) => (
          <ListItem key={i} disablePadding>
            <Checkbox
              checked={filters.type === type}
              onChange={() => handleFilterChange('type', type, true)}
              color="primary"
              sx={{ color: '#F0CA83' }}
            />
            <ListItemText primary={type} />
          </ListItem>
        ))}
      </List>
      <Divider className='bg-[#F0CA83] my-3' />
      <ListItem className="flex justify-center gap-1">
        <Button
          className="bg-[#F0CA83] hover:bg-[#ffc457] px-3 py-2 text-[#303030] font-bold"
          onClick={handleDrawerClose}
        >
          OK
        </Button>
        <Button
          className="hover:bg-[#5e5138] px-3 py-2 text-[#F0CA83] font-bold"
          variant='outlined'
          onClick={handleResetFilters}
        >
          RESET
        </Button>
      </ListItem>
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
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#303030',
                    color: '#F0CA83'
                  },
                }}
                variant="temporary"
                anchor="left"
                open={open}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <DrawerHeader className="py-3">
                  <Box className="flex absolute ml-12 justify-center items-center pt-2">
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: 'monospace',
                        fontWeight: 600,
                        letterSpacing: '.2rem',
                        color: '#F0CA83',
                        textDecoration: 'none',
                      }}
                    >
                      FILTERS
                    </Typography>
                  </Box>
                  <Box className="flex justify-end items-center pt-1">
                    <IconButton onClick={handleDrawerClose}>
                      <CloseIcon className='text-[#F0CA83]' />
                    </IconButton>
                  </Box>
                </DrawerHeader>
                <Divider className='bg-[#F0CA83]' />
                {list}
              </Drawer>
              <Box className="flex justify-between">
                <Box className="w-[200px] items-center pt-6">
                  <Button
                    className="bg-[#F0CA83] p-2 hover:bg-[#ffc457] text-[#303030] font-bold"
                    onClick={handleDrawerOpen}
                  >
                    Show&nbsp;Filters
                  </Button>
                </Box>
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
            {sortedWigData.length > 0 ? (
              sortedWigData.slice((page - 1) * pageSize, page * pageSize).map((item, i) => (
                <Grid item xs={6} sm={4} md={3} key={i} className="flex items-center justify-center">
                  <Card variant="outlined" sx={{ maxWidth: 320 }}>
                    {/* <Box className="flex float-left">
                      <div className="absolute">
                        <IconButton className="z-10" onClick={() => handleToggleFavorite(item._id)}>
                          {isFavorite[item._id] ? <FavoriteIcon className="text-[#F87170]" /> : <FavoriteBorderIcon className="text-[#5f5f5f]" />}
                        </IconButton>
                      </div>
                    </Box> */}
                    <Box className="flex float-right">
                      <div className="absolute">
                        <IconButton className="z-10 right-10" onClick={() => handleToggleFavorite(item._id)}>
                          {isFavorite[item._id] ? <FavoriteIcon className="text-[#F87170]" /> : <FavoriteBorderIcon className="text-[#5f5f5f]" />}
                        </IconButton>
                      </div>
                    </Box>
                    <Link href={`./Wig/[id]`} as={`./Wig/${item._id}`}>
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
                          <Typography gutterBottom component="div" className="text-base max-sm:text-xs">
                            {item.title}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                    <CardActionArea className="flex justify-between items-center px-2 py-1">
                      <Stack direction="row" spacing={1} className='py-1'>
                        <Chip icon={<RemoveRedEyeIcon />} label={item.view.toFixed(0)} />
                      </Stack>
                      <Button className="bg-[#555555]">
                        <Typography variant="body2" className="font-bold tracking-widest text-white text-base max-sm:text-xs">
                          {item.price?.toLocaleString()}&nbsp;฿
                        </Typography>
                      </Button>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} className="flex items-center justify-center my-10">
                <center><EmptyWig /></center>
              </Grid>
            )}

          </Grid>
          <Box className="flex justify-center mt-6">
            <Stack spacing={2}>
              <Pagination
                count={pageCount}
                color="primary"
                page={page}
                onChange={handleChangePage}
              />
            </Stack>
          </Box>
        </Container>
      </Paper>
      <Footer />
    </ThemeProvider>

  )
}
