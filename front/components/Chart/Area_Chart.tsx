import React from 'react'
import { AreaChart, } from "@tremor/react";

import Website_View from '../../helper/Website_View.json'

export default function Area_Chart() {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    Website_View.map(data => {
        let date = new Date(data.date);
        data.day = days[date.getUTCDay()]
    })

    return (
        <div>
            <AreaChart
                data={Website_View}
                dataKey="day"
                categories={["view"]}
                colors={["red",]}
                marginTop="mt-6"
                yAxisWidth="w-12"
            />
        </div>
    )
}