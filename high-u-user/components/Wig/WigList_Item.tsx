import * as React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Typography,
    Grid,
} from '@mui/material'

function WigList_Item({ item }: { item: any }) {

    return (
        <Grid item xs={6} sm={6} md={3}>
            <Card variant="outlined" sx={{ maxWidth: 400, }} >
                <CardActionArea>
                    <CardMedia
                        className='imageZoom'
                        component="img"
                        image={item.image}
                    />
                    <CardContent >
                        <Typography gutterBottom component="div" sx={{ fontWeight: 'bold', }}>
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.brand}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default WigList_Item