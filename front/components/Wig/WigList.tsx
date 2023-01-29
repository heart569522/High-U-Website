import React, { useEffect, useState } from 'react'
import {
    Paper,
    Box,
    Grid,
    Container,
    InputLabel,
    MenuItem,
    FormControl,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Typography,
    Skeleton

} from '@mui/material'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { createTheme, ThemeProvider, } from '@mui/material/styles';

import Link from 'next/link'
import _ from 'lodash';

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

function WigList() {
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

    const handleChange_Color = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        setSelectedColor(event.target.value as string);
    };

    const handleChange_Size = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        setSelectedSize(event.target.value as string);
    };

    const handleChange_Brand = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        setSelectedBrand(event.target.value as string);
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ backgroundColor: '#faf7f7', }}>
                <Container maxWidth="xl" >
                    {/* SELECT INPUT */}

                    <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ padding: 5, }}>
                        <Grid item xs={12} sm={4}>
                            {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-10 rounded-md" />) : (
                                <Box sx={{ minWidth: 100 }}>
                                    <FormControl fullWidth >
                                        <InputLabel color='warning'>Colors</InputLabel>
                                        <Select
                                            color='warning'
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedColor || ''}
                                            label="First Menu"
                                            onChange={handleChange_Color}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {uniqueColors.map((item, i) => (
                                                <MenuItem value={item} key={i}>{item}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-10 rounded-md" />) : (
                                <Box sx={{ minWidth: 100 }}>
                                    <FormControl fullWidth >
                                        <InputLabel color='warning'>Sizes</InputLabel>
                                        <Select
                                            color='warning'
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedSize || ''}
                                            label="Second Menu"
                                            onChange={handleChange_Size}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {uniqueSizes.map((item, i) => (
                                                <MenuItem value={item} key={i}>{item}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-10 rounded-md" />) : (
                                <Box sx={{ minWidth: 100 }}>
                                    <FormControl fullWidth >
                                        <InputLabel color='warning'>Brands</InputLabel>
                                        <Select
                                            color='warning'
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedBrand || ''}
                                            label="third Menu"
                                            onChange={handleChange_Brand}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {uniqueBrand.map((item, i) => (
                                                <MenuItem value={item} key={i}>{item}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                    </Grid>


                    {/* WIG PRODUCT */}
                    <Grid container spacing={2} className="p-3">
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
                                    <Grid item xs={6} sm={4} md={3} key={i}>
                                        {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-96 rounded-md" />) : (
                                            <Link href="/user/WigProduct">
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