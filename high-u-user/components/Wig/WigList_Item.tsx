import * as React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material'

function WigList_Item({ item }: { item: any }) {
    return (
        <Grid item xs={6} sm={6} md={3}>
            <Card variant="outlined" sx={{ maxWidth: 400, }}>
                <CardMedia
                    component="img"
                    image={item.image}
                />
                <CardContent>
                    <Typography gutterBottom component="div" sx={{ fontWeight: 'bold', }}>
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.brand}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default WigList_Item