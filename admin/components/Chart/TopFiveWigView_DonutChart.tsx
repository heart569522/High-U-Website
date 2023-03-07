import React, { useState } from 'react'
import { DonutChart, Flex, Legend, List, ListItem, Title, Toggle, ToggleItem, } from "@tremor/react";
import { Grid } from '@mui/material';

import Wig_Product from '../../helper/Wig_Product.json'

export default function TopFiveWigView_DonutChart() {
    const topFiveViews = Wig_Product.sort((item1, item2) => item2.view - item1.view).slice(0, 5);
    
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Legend 
                        categories={ Wig_Product.map((item) => item.title).slice(0, 5) }  
                        marginTop="mt-6"
                        colors={["yellow", "amber", "orange", "red", "rose"]}
                    />
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
            </Grid>
        </div>
    )
}

