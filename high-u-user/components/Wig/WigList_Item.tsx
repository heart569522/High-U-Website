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
                        className='hover:opacity-90 transition duration-200 ease-in-out'
                        component="img"
                        image={item.image}
                    />
                    <CardContent >
                        <Typography gutterBottom component="div" className="font-bold text-md mb-2">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" className="text-gray-500 text-base">
                            {item.brand}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default WigList_Item