import React from 'react'
import { AreaChart, } from "@tremor/react";

import Wig_Product from '../../helper/Wig_Product.json'

export default function Area_Chart() {
    const topTenFav = Wig_Product.sort((item1, item2) => item2.favorite - item1.favorite).slice(0, 10);
    return (
        <div>
            <AreaChart
                data={topTenFav}
                dataKey="title"
                showXAxis={false}
                categories={["favorite"]}
                colors={["amber",]}
                marginTop="mt-6"
                yAxisWidth="w-12"
            />
        </div>
    )
}