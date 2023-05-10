import React, { useEffect, useState } from 'react'
import { List, ListItem } from "@tremor/react";
import { Box, Grid } from '@mui/material';

interface Wig {
    title: string;
    view: number;
}

export default function TopFiveWigView_List() {
    const [topWig, setTopWig] = useState<Wig[]>([]);

    useEffect(() => {
        fetch(`${process.env.API_URL}/api/wig/getTop5ViewWigs`)
            .then((response) => response.json())
            .then(data => {
                const wig = data;
                setTopWig(wig)
            })
            .catch((error) => console.log(error));
    }, []);

    const topWigViews = topWig.map((wig) => ({ view: wig.view, title: wig.title }));

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Box className="flex justify-center items-center">
                        <List className="mt-6">
                            {topWigViews.map((item, i) => (
                                <ListItem key={i}>
                                    <span className="text-base">{item.title}</span>
                                    <span className="text-base font-bold">{item.view}</span>
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                </Grid>
            </Grid>

        </div>
    )
}

