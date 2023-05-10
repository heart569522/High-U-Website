import React, { useEffect, useState } from 'react'
import { DonutChart, Legend } from "@tremor/react";
import { Box, Grid } from '@mui/material';

interface Wig {
    title: string;
    view: number;
}

export default function TopFiveWigView_DonutChart() {
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
    const topWigTitle = topWig.map((wig) => wig.title);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box className="flex justify-between gap-8">
                    <DonutChart
                        data={topWigViews}
                        category="view"
                        variant="pie"
                        index="title"
                        className="mt-6 h-72 w-72"
                        colors={["yellow", "amber", "orange", "red", "rose"]}
                    />
                    <Legend
                        categories={topWigTitle}
                        className="mt-6"
                        colors={["yellow", "amber", "orange", "red", "rose"]}
                    />
                </Box>
            </Grid>
        </Grid>
    );

}
