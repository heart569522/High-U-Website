import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Box, } from '@mui/material';
import Image from 'next/image';
import Banner_Item from '../../helper/Banner_Item.json';

type Banner = {
    id: string;
    image: string;
    title: string;
}

export default function WigBanner() {
    const [banner, setBanner] = useState<Banner[]>(Banner_Item);

    return (
        <Box className="w-full h-auto">
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#F0CA83",
                    "--swiper-navigation-size": "26px;"
                } as any}
                pagination={{
                    type: "progressbar",
                }}
                navigation={true}
                loop={true}
                autoHeight={true}
                autoplay={{
                    delay: 4000,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full"
            >
                {banner?.map((item, i) => (
                    <SwiperSlide key={i}>
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={1400}
                            height={400}
                            className="w-full object-cover h-full"
                            priority
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}
