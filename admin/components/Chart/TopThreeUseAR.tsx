import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

interface Wig {
    title: string;
    use: number;
    main_image: string;
}

export default function TopThreeUseAR() {
    const [topWig, setTopWig] = useState<Wig[]>([]);

    useEffect(() => {
        fetch(`${process.env.API_URL}/api/wig/getTop3UseAR`)
            .then((response) => response.json())
            .then(data => {
                const wig = data;
                setTopWig(wig)
            })
            .catch((error) => console.log(error));
    }, []);

    const topWigUse = topWig.map((wig) => ({ main_image: wig.main_image, use: wig.use, title: wig.title }));

    return (
        <Grid container spacing={2}>
            {topWigUse.map((item, i) => (
                <Grid item xs={12} sm={12} md={12} xl={4} key={i} className="mt-4" data-aos="fade-zoom-in">
                    <Box className="bg-slate-100 rounded-lg p-4">
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Image
                                    src={item.main_image}
                                    alt={item.title}
                                    width={200}
                                    height={300}
                                    className="rounded-lg w-52 h-auto max-[590px]:w-44 max-[440px]:w-32"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Box className="flex-col text-center ">
                                    <Typography className="text-[#303030] font-bold text-base max-[1535px]:text-lg max-[590px]:text-sm max-[440px]:text-xs">{item.title}</Typography>
                                    <Typography className="text-[#303030] font-bold text-[90px] max-[1535px]:text-[100px] max-[590px]:text-[75px] max-[440px]:text-[50px]">{item.use}</Typography>
                                    <Typography className="text-[#303030] font-bold text-2xl max-[1535px]:text-3xl max-[590px]:text-lg max-[440px]:text-base">Try AR</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            ))}
        </Grid>
    )
}
