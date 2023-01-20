import React from 'react'
import { BarChart, } from "@tremor/react";

function Bar_Chart() {
    const dayOfWeek = [
        {
            name: "Sunday",
            "Number of Views": 254,
        },
        {
            name: "Monday",
            "Number of Views": 162,
        },
        {
            name: "Tuesday",
            "Number of Views": 87,
        },
        {
            name: "Wednesday",
            "Number of Views": 124,
        },
        {
            name: "Thursday",
            "Number of Views": 64,
        },
        {
            name: "Friday",
            "Number of Views": 210,
        },
        {
            name: "Saturday",
            "Number of Views": 175,
        },
    ];

    // const dataFormatter = (number: number) => {
    //     return "$ " + Intl.NumberFormat("us").format(number).toString();
    // };

    return (
        <div>
            <BarChart
                data={dayOfWeek}
                dataKey="name"
                categories={["Number of Views"]}
                colors={["amber"]}
                // valueFormatter={dataFormatter}
                marginTop="mt-6"
                yAxisWidth="w-12"
            />
        </div>
    )
}

export default Bar_Chart