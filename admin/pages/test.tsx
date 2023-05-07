import React, { useEffect, useState } from 'react'
import { DonutChart, Legend } from "@tremor/react";
import { Grid } from '@mui/material';

const API_URL = "http://localhost:8000"

export default function test() {
    const [topWig, setTopWig] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/api/wig/getTop5ViewWigs`)
            .then((response) => response.json())
            .then(data => {
                const wig = data;
                setTopWig(wig)
            })
            .catch((error) => console.log(error));
    }, []);

    // console.log(topWig);
    

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Legend
                        categories={topWig.map((item) => item.title)}
                        className="mt-6"
                        colors={["yellow", "amber", "orange", "red", "rose"]}
                    />
                    <DonutChart
                        data={topWig}
                        category="view"
                        variant="pie"
                        index="title"
                        className="mt-6 h-72"
                        colors={["yellow", "amber", "orange", "red", "rose"]}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
