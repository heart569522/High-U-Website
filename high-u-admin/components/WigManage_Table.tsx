import React, { useState } from 'react'
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableHead,
    TableRow,
    Box,
    Typography,
    Toolbar,
    Grid,
    Hidden,
    Accordion,
    AccordionActions,
    AccordionSummary,
    AccordionDetails,
    ButtonGroup,
    Button,
    Modal
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Wig_Product from '../helper/Wig_Product.json';

const drawerWidth = 240;
const theme = createTheme({
    typography: {
        fontFamily: [
            'Prompt, sans-serif'
        ].join(','),
    },
    palette: {
        primary: {
            main: "#F0CA83",
        },
        secondary: {
            main: "#303030"
        }
    },
});

function WigManage_Table() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    // const item = String;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };
    const selectedRow = Wig_Product.find((item) => item.id === selectedId);

    return (
        <ThemeProvider theme={theme}>
            <Box
                component="main"
                className="h-full p-5 ml-[240px] max-[899px]:ml-0"
                sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Grid container>
                    <Grid xs={12} md={12}>
                        <Box className="bg-white w-full h-full rounded-xl pt-5 px-5 shadow-md max-[899px]:pb-3">
                            <Typography className="text-[#303030] font-bold text-xl">
                                Wigs Manage
                            </Typography>
                            <Hidden mdDown >
                                <TableContainer className="mt-3 rounded-md">
                                    <Table className="">
                                        <TableHead>
                                            <TableRow className=" bg-[#ffe6b8]">
                                                <TableCell className="w-[5%] text-lg text-center font-bold">No.</TableCell>
                                                <TableCell className="w-auto text-lg font-bold">Title</TableCell>
                                                <TableCell className="w-[15%] text-lg font-bold">Color</TableCell>
                                                <TableCell className="w-[15%] text-lg font-bold">Size</TableCell>
                                                <TableCell className="w-[15%] text-lg text-center font-bold">Settings</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Wig_Product.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => (
                                                <TableRow key={item.id} className="hover:bg-gray-50">
                                                    <TableCell className="w-[5%] text-center">{item.id}</TableCell>
                                                    <TableCell
                                                        className="w-auto cursor-pointer hover:underline"
                                                        onClick={() => {
                                                            setModalOpen(true);
                                                            // setSelectedId(item.id);
                                                        }}>
                                                        {item.title}
                                                    </TableCell>
                                                    <TableCell className="w-[15%]">{item.color}</TableCell>
                                                    <TableCell className="w-[15%]">{item.size}</TableCell>
                                                    <TableCell className="w-[15%] text-center ">
                                                        <ButtonGroup variant="contained" aria-label="contained button group">
                                                            <Button className="bg-[#303030] text-white hover:bg-amber-500">Edit</Button>
                                                            <Button className="bg-[#303030] text-white hover:bg-red-500">Delete</Button>
                                                        </ButtonGroup>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 50, 100]}
                                    component="div"
                                    count={Wig_Product.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Hidden>
                            <Hidden mdUp>
                                {Wig_Product.map((item, i) => (
                                    <Accordion key={item.id} className="shadow-md">
                                        <AccordionSummary>
                                            <Typography className="font-semibold">{item.title}</Typography>
                                        </AccordionSummary>
                                        {/* <AccordionDetails className="w-52 h-auto">
                                            <img src={item.image} alt={item.title} />
                                        </AccordionDetails> */}
                                        <AccordionDetails className="bg-gray-50">
                                            <Typography>Color: {item.color}</Typography><br />
                                            <Typography>Size: {item.size}</Typography>
                                        </AccordionDetails>
                                        <AccordionActions>
                                            <ButtonGroup variant="contained" aria-label="contained button group">
                                                <Button
                                                    className="bg-[#303030] text-white hover:bg-blue-500"
                                                    onClick={() => {
                                                        setModalOpen(true);
                                                        // setSelectedId(item.id);
                                                    }}>
                                                    Detail
                                                </Button>
                                                <Button className="bg-[#303030] text-white hover:bg-amber-500">Edit</Button>
                                                <Button className="bg-[#303030] text-white hover:bg-red-500">Delete</Button>
                                            </ButtonGroup>
                                        </AccordionActions>
                                    </Accordion>
                                ))}
                            </Hidden>
                            <Modal
                                open={modalOpen}
                                onClose={handleModalClose}
                                className="flex justify-center items-center"
                            >
                                <Box className="w-5/6 h-5/6 bg-gray-100 rounded-lg p-5">
                                    <Grid container>
                                        <Grid item sm={12} md={6}>
                                            <Box>
                                                <img src="https://cdn.shopify.com/s/files/1/1410/9094/products/Resized-525x700-_0001_ew_purepower_cascade_1.jpg?v=1626906369" />
                                            </Box>

                                        </Grid>
                                    </Grid>
                                </Box>
                            </Modal>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    )
}

export default WigManage_Table