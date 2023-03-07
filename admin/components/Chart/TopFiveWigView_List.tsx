import React, { useState } from 'react'
import { DonutChart, Flex, List, ListItem, Title, Toggle, ToggleItem, } from "@tremor/react";
import { Grid } from '@mui/material';

import Wig_Product from '../../helper/Wig_Product.json'

export default function TopFiveWigView_List() {
    const topFiveViews = Wig_Product.sort((item1, item2) => item2.view - item1.view).slice(0, 5);
    
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} className="flex items-center">
                    <List marginTop="mt-6">
                        {topFiveViews.map((item, i) => (
                            <ListItem key={i}>
                                <span className="text-base">{item.title}</span>
                                <span className="text-base font-bold">{item.view}</span>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>

        </div>
    )
}

