import * as React from 'react';
import { Paper, } from '@mui/material'

function WigBanner_Item({item} : { item: any}) {
    return (
        <Paper>
            <img 
                src={item.image} 
                alt={item.title} 
                style={{ 
                    width: '100%', 
                    height: 'auto' 
                }} 
            />
        </Paper>
    )
}

export default WigBanner_Item