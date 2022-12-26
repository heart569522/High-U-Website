

import React from 'react';
import { makeStyles, } from '@mui/material/styles';
import { Card, Chip, Avatar } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Zoom from "@mui/material/Zoom";

export default function ImageCard() {
  return (
    <div className="content">
      <div className="content-overlay"></div>
      <img className="content-image" src="https://cdn.shopify.com/s/files/1/1410/9094/products/Resized-525x700-_0001_ew_purepower_cascade_1.jpg?v=1626906369" />
      <div className="content-details fadeIn-bottom">
        <h3 className="content-title">This is a title</h3>
        <p className="content-text">This is a short description</p>
      </div>
    </div>

  );
}





