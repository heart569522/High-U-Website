import React from 'react'
import { DonutChart, List, ListItem, } from "@tremor/react";
import { Grid } from '@mui/material';

import Wig_Product from '../../helper/Wig_Product.json'

export default function Donut_Chart() {
    const topFiveViews = Wig_Product.sort((item1, item2) => item2.view - item1.view).slice(0, 5);

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <DonutChart
                        data={topFiveViews}
                        category="view"
                        variant="pie"
                        dataKey="title"
                        marginTop="mt-6"
                        colors={["yellow", "amber", "orange", "red", "rose"]}
                        height="h-72"
                    />
                </Grid>
                <Grid item xs={12} sm={6} className="flex items-center">
                    <List marginTop="mt-6">
                        {topFiveViews.map((item, i) => (
                            <ListItem key={i}>
                                <span>{item.title}</span>
                                <span><b>{item.view}</b></span>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>

        </div>
    )
}

