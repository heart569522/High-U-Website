import React from 'react'
import { AreaChart, } from "@tremor/react";
import _ from 'lodash'

import Website_View from '../../helper/Website_View.json'

export default function WebsiteView_AreaChart() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const groupByDay = _.groupBy(Website_View, data => {
        let date = new Date(data.date);
        return days[date.getUTCDay()]
    });
    let chartDayData: any[] = []
    Object.keys(groupByDay).forEach(day => {
        let totalViews = groupByDay[day].reduce((acc, curr) => acc + curr.view, 0)
        chartDayData.push({ day, view: totalViews })
    })
    chartDayData.sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day))

    return (
        <div>
            <AreaChart
                data={chartDayData}
                dataKey="day"
                categories={["view"]}
                colors={["red",]}
                marginTop="mt-6"
                yAxisWidth="w-12"
            />
        </div>
    )
}