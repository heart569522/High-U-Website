

import React from 'react';
import { makeStyles, } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Zoom from "@mui/material/Zoom";

export default function ImageCard() {
  return (
    <Card className="bg-yellow-300 pt-5" style={{ maxWidth: 345 }}>
      <Zoom in={true}>
        <CardMedia
          style={{ height: 140 }}
          component="img"
          image="https://t4.ftcdn.net/jpg/04/27/41/05/360_F_427410504_H6zGuHXoNdaH7Ghwpou1dXgbODusZeAg.jpg"
          title="Image title"
        />
      </Zoom>
    </Card>
  );
}





