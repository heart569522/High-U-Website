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
  Drawer

} from '@mui/material'
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider, styled} from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link'
import EmptyWig from '../../components/Other/EmptyWig';
import Navbar from '../../components/Navigation/Navigation';
import WigBanner from "../../components/Wig/WigBanner"
import Footer from '../../components/Footer/Footer';


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

interface Filters {
  length: {
    min?: number;
    max?: number;
  };
  color: string | number;
  type: string | number;
  price: number;
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

const drawerWidth = 300;

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Wig(props: Props) {
  const [wigData, setWigData] = useState<Wig[]>(props.wigs);
  const [selectSort, setSelectSort] = useState("");
  const [sortedWigData, setSortedWigData] = useState<Wig[]>([]);
  const [hoverWigImage, setHoverWigImage] = useState<string>("");
  const [page, setPage] = useState(1);

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const pageSize = 9;
  const pageCount = Math.ceil(sortedWigData.length / pageSize);

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

  const [filters, setFilters] = useState<Filters>({
    length: { min: undefined, max: undefined },
    color: '',
    type: '',
    price: Number.MAX_VALUE
  });

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleFilterChange = (filterType: string, value: string | number) => {
    switch (filterType) {
      case 'length':
        let minLength: number | undefined, maxLength: number | undefined;
        if (value === 'Short') {
          minLength = 6;
          maxLength = 10;
        } else if (value === 'Medium') {
          minLength = 12;
          maxLength = 16;
        } else if (value === 'Long') {
          minLength = 18;
          maxLength = undefined;
        }
        setFilters((prevFilters) => ({
          ...prevFilters,
          length: { min: minLength || 0, max: maxLength || Number.MAX_VALUE },
        }));
        break;
      case 'color':
        setFilters((prevFilters) => ({ ...prevFilters, color: value.toString() }));
        break;
      case 'type':
        setFilters((prevFilters) => ({ ...prevFilters, type: value.toString() }));
        break;
      case 'price':
        setFilters((prevFilters) => ({ ...prevFilters, price: Number(value) }));
        break;
      default:
        break;
    }
  };


  const filterWigs = (wigs: Wig[], filters: Filters): Wig[] => {
    return wigs.filter((wig) => {
      const lengthFilter = filters.length;
      const size = wig.size[0];
      return (
        size >= (lengthFilter?.min || 0) &&
        size <= (lengthFilter?.max || Number.MAX_VALUE) &&
        wig.color === filters.color &&
        wig.type === filters.type &&
        wig.price <= filters.price
      );
    });
  };

  const uniqueColors = Array.from(new Set(wigData.map((wig) => wig.color)));
  const uniqueTypes = Array.from(new Set(wigData.map((wig) => wig.type)));

  const list = (
    <Box
      role="presentation"
    >
      <List>
        <ListItem disablePadding>
          <ListItemText primary="Filter by Length" />
        </ListItem>
        {['Short', 'Medium', 'Long'].map((text, i) => (
          <ListItem key={i} disablePadding>
            <Checkbox
              checked={filters.length.min === (text === 'Short' ? 6 : text === 'Medium' ? 12 : 18)}
              onChange={() => handleFilterChange('length', text)}
              color="primary"
            />
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemText primary="Filter by Color" />
        </ListItem>
        {uniqueColors.map((color, i) => (
          <ListItem key={i} disablePadding>
            <Checkbox
              checked={filters.color === color}
              onChange={() => handleFilterChange('color', color)}
              color="primary"
            />
            <ListItemText primary={color} />
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemText primary="Filter by Type" />
        </ListItem>
        {uniqueTypes.map((type, i) => (
          <ListItem key={i} disablePadding>
            <Checkbox
              checked={filters.type === type}
              onChange={() => handleFilterChange('type', type)}
              color="primary"
            />
            <ListItemText primary={type} />
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemText primary="Filter by Price" />
        </ListItem>
        <ListItem>
          <input type="range" onChange={(e) => handleFilterChange('price', e.target.value)} />
        </ListItem>
      </List>
      <Divider />
      <Button
        className="bg-[#F0CA83] hover:bg-[#ffc457] px-3 py-2 text-[#303030] font-bold"
        onClick={handleDrawerClose}
      >
        OK
      </Button>
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
                className="shadow-md"
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                  },
                }}
                variant="persistent"
                anchor="left"
                open={open}
              >
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    <CloseIcon />
                  </IconButton>
                </DrawerHeader>
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
            {(sortedWigData.length > 0 ? sortedWigData : wigData)
              .slice((page - 1) * pageSize, page * pageSize)
              .map((item, i) => (
                <Grid item xs={6} sm={4} md={3} key={i} className="flex items-center justify-center">
                  <Link href={`./Wig/[id]`} as={`./Wig/${item._id}`}>
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