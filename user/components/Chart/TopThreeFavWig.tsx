import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Wig_Product from '../../helper/Wig_Product.json'

export default function TopThreeFavWig() {
    const topThreeFav = Wig_Product.sort((item1, item2) => item2.favorite - item1.favorite).slice(0, 3);

    return (
        <Grid container spacing={2}>
            {topThreeFav.map((item, i) => (
                <Grid item xs={12} sm={12} md={12} xl={4} key={i} className="mt-4" data-aos="fade-zoom-in">
                    <Box className="bg-slate-100 rounded-lg p-4">
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <img src={item.image} alt={item.title} className="rounded-lg w-52 h-auto max-[590px]:w-44 max-[440px]:w-32" />
                            </Grid>
                            <Grid item xs={6}>
                                <Box className="flex-col text-center ">
                                    <Typography className="text-[#303030] font-bold text-base max-[1535px]:text-lg max-[590px]:text-sm max-[440px]:text-xs">{item.title}</Typography>
                                    <Typography className="text-[#303030] font-bold text-[90px] max-[1535px]:text-[100px] max-[590px]:text-[75px] max-[440px]:text-[50px]">{item.favorite}</Typography>
                                    <Typography className="text-[#303030] font-bold text-2xl max-[1535px]:text-3xl max-[590px]:text-lg max-[440px]:text-base">Favorite</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            ))}
        </Grid>
    )
}
