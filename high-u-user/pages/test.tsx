

import React from 'react';
import { makeStyles, } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Zoom from "@mui/material/Zoom";

export default function ImageCard() {
  return (
    <Card className="bg-white" style={{ maxWidth: 345 }}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg z-10">
        <img className="w-full hover:opacity-90 transition duration-300 ease-in-out" src="https://cdn.shopify.com/s/files/1/1410/9094/products/Resized-525x700-_0001_ew_purepower_cascade_1.jpg?v=1626906369" alt="Sunset in the mountains" />
        <div className="px-6 py-4 z-20">
          <div className="font-bold text-xl mb-2">Cascade | Remy Human Hair Lace Front Wig (Hand-Tied)</div>
          <p className="text-gray-700 text-base">
          Ellen Wille
          </p>
        </div>
      
      </div>
    </Card>
  );
}





