import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Toolbar,
  Grid
} from "@mui/material";
import DrawerBar from "../components/DrawerBar"

const drawerWidth = 240;

function ResponsiveTable() {
  return (
    <div>
      <DrawerBar />
      <Box
        component="main"
        className="bg-slate-200 h-screen p-5 ml-[240px] max-[899px]:ml-0"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Grid container>
          <Grid xs={12} md={12}>
            <Box className="bg-white w-full h-full rounded-xl p-5">
              <Typography className="text-[#303030] font-bold text-xl mb-4">
                Test Table
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Column 1
                      </TableCell>
                      <TableCell className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Column 2
                      </TableCell>
                      <TableCell className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Column 3
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className="odd:bg-white">
                      <TableCell className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                        Cell 1
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        Cell 2
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        Cell 3
                      </TableCell>
                    </TableRow>
                    <TableRow className="odd:bg-gray-50">
                      <TableCell className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                        Cell 4
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        Cell 5
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        Cell 6
                      </TableCell>
                    </TableRow>
                    <TableRow className="odd:bg-white">
                      <TableCell className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                        Cell 7
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        Cell 8
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        Cell 9
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>


  );
}

export default ResponsiveTable