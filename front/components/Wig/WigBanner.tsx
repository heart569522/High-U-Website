import * as React from 'react';
import Carousel from 'react-material-ui-carousel'

import WigBanner_Item from './WigBanner_Item';
import Banner_Item from '../../helper/Banner_Item.json';


export default function WigBanner() {
    

    return (
        <Carousel
            indicators={false}
            animation="fade"
            duration={500}
        >
            {Banner_Item.map((item, i) => <WigBanner_Item key={item.id} item={item} />)}
        </Carousel>
    )
}