import React from 'react'
import Button from '@mui/material/Button';
import { Box, Toolbar } from '@mui/material';

const drawerWidth = 240;

export default function test() {

    return (
        <Box
            component="main"
            className="p-5 ml-[240px] max-[899px]:ml-0"
            sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar />
            <Box className="bg-white w-full h-full rounded-xl pt-5 pb-5 px-5 shadow-md max-[899px]:pb-3">
                <Button variant="contained" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Contained</Button>
                
            </Box>

        </Box>

    )
}
