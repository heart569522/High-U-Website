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
    SwipeableDrawer

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

// import WigList_Item from './WigList_Item';
import Wig_Product from '../../helper/Wig_Product.json';

import EmptyWig from '../Other/EmptyWig';

const theme = createTheme({
    palette: {
        warning: {
            main: "#F0CA83",
        },
    },
    typography: {
        fontFamily: [
            'Prompt, sans-serif'
        ].join(','),
    },

});

type Anchor = 'left';


function WigList() {
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


    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch data
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [loading]);

    const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
    const uniqueColors = Array.from(new Set(Wig_Product.map(item => item.color)));
    const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
    const uniqueSizes = Array.from(new Set(Wig_Product.map(item => item.size)));
    const [selectedBrand, setSelectedBrand] = React.useState<string | null>(null);
    const uniqueBrand = Array.from(new Set(Wig_Product.map(item => item.brand)));

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ backgroundColor: '#faf7f7', pb: 4, display: 'flex' }}>
                <Container maxWidth="xl" >
                    {/* SELECT INPUT */}
                    <Grid container spacing={3} alignItems="center" justifyContent="center" className="py-8">
                        <Grid item xs={12}>
                            <Typography className="text-6xl font-bold max-md:text-5xl max-sm:text-4xl">High U Wig</Typography>
                            <Divider className="py-2 w-full" />
                            {(['left'] as const).map((anchor, i) => (
                                <Box className="pt-3" key={i}>
                                    <Button className="bg-[#F0CA83] hover:bg-[#ffc457] p-3 text-[#303030] font-bold" onClick={toggleDrawer(anchor, true)}>Show&nbsp;Filters</Button>
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
                        </Grid>
                    </Grid>


                    {/* WIG PRODUCT */}
                    <Grid container spacing={2}>
                        {
                            Wig_Product.filter((item) => {
                                if (selectedColor && selectedSize && selectedBrand) {
                                    return item.color === selectedColor && item.size === selectedSize && item.brand === selectedBrand
                                } else if (selectedColor && selectedSize) {
                                    return item.color === selectedColor && item.size === selectedSize
                                } else if (selectedColor && selectedBrand) {
                                    return item.color === selectedColor && item.brand === selectedBrand
                                } else if (selectedSize && selectedBrand) {
                                    return item.size === selectedSize && item.brand === selectedBrand
                                } else if (selectedColor) {
                                    return item.color === selectedColor
                                } else if (selectedSize) {
                                    return item.size === selectedSize
                                } else if (selectedBrand) {
                                    return item.brand === selectedBrand
                                }
                                return true
                            }).length ?
                                Wig_Product.filter((item) => {
                                    if (selectedColor && selectedSize && selectedBrand) {
                                        return item.color === selectedColor && item.size === selectedSize && item.brand === selectedBrand
                                    } else if (selectedColor && selectedSize) {
                                        return item.color === selectedColor && item.size === selectedSize
                                    } else if (selectedColor && selectedBrand) {
                                        return item.color === selectedColor && item.brand === selectedBrand
                                    } else if (selectedSize && selectedBrand) {
                                        return item.size === selectedSize && item.brand === selectedBrand
                                    } else if (selectedColor) {
                                        return item.color === selectedColor
                                    } else if (selectedSize) {
                                        return item.size === selectedSize
                                    } else if (selectedBrand) {
                                        return item.brand === selectedBrand
                                    }
                                    return true
                                }).map((item, i) => (
                                    <Grid item xs={6} sm={4} md={3} key={i} className="flex items-center justify-center">
                                        {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-96 rounded-md" />) : (
                                            <Link href="/WigProduct">
                                                <Card variant="outlined" sx={{ maxWidth: 320 }}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            className=' hover:opacity-90 transition duration-200 ease-in-out'
                                                            component="img"
                                                            image={item.image}
                                                        />
                                                        <CardContent>
                                                            <Typography gutterBottom component="div" className="font-bold text-base mb-2 max-sm:text-xs">
                                                                {item.title}
                                                            </Typography>
                                                            <Typography variant="body2" className="text-gray-500 text-base max-sm:text-xs">
                                                                {item.brand}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </Link>
                                        )}
                                    </Grid>
                                ))
                                :
                                <Grid item xs={12} className="flex items-center justify-center my-10">
                                    <center><EmptyWig /></center>
                                </Grid>
                        }
                    </Grid>
                </Container>
            </Paper>
        </ThemeProvider>
    )
}

export default WigList