import React from 'react'
import { DonutChart, } from "@tremor/react";

export default function Donut_Chart() {
    const cities = [
        {
            name: 'New York',
            sales: 9800,
        },
        {
            name: 'London',
            sales: 4567,
        },
        {
            name: 'Hong Kong',
            sales: 3908,
        },
        {
            name: 'San Francisco',
            sales: 2400,
        },
        {
            name: 'Singapore',
            sales: 1908,
        },
        {
            name: 'Zurich',
            sales: 1398,
        },
    ];

    const valueFormatter = (number: number) => (
        `$ ${Intl.NumberFormat('us').format(number).toString()}`
    );

    return (
        <div>
            <DonutChart
                data={cities}
                category="sales"
                variant="pie"
                dataKey="name"
                // valueFormatter={valueFormatter}
                marginTop="mt-6"
                colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                height="h-72"
            />
        </div>
    )
}

