import React from 'react'
import { DonutChart, } from "@tremor/react";

import Wig_Product from '../../helper/Wig_Product.json'

export default function Donut_Chart() {
    const topFiveViews = Wig_Product.sort((item1, item2) => item2.view - item1.view).slice(0, 5);
    
    const valueFormatter = (number: number) => (
        `Views : ${Intl.NumberFormat().format(number).toString()}`
    );

    return (
        <div>
            <DonutChart
                data={topFiveViews}
                category="view"
                variant="donut"
                dataKey="title"
                valueFormatter={valueFormatter}
                marginTop="mt-6"
                colors={["yellow", "amber", "orange", "rose", "red"]}
                height="h-72"
            />
        </div>
    )
}

