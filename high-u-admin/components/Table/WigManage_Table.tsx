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
    Modal,
    Divider,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Wig_Product from '../../helper/Wig_Product.json';
import { Close } from '@mui/icons-material';

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
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    return (
        <ThemeProvider theme={theme}>
            <Box
                component="main"
                className="h-full p-5 ml-[240px] max-[899px]:ml-0"
                sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Box className="bg-white w-full h-full rounded-xl pt-5 px-5 shadow-md max-[899px]:pb-3">
                    <Grid container>
                        <Grid item xs={12} md={12} className="flex items-center justify-between max-md:mb-3">
                            <Typography className="text-[#303030] font-bold text-2xl">
                                Wigs Manage
                            </Typography>
                            <Link href="/AddWig">
                                <Button className="text-white font-bold px-5 text-center shadow bg-[#303030] hover:bg-blue-700">Add Wig</Button>
                            </Link>
                        </Grid>
                        <Hidden mdDown >
                            <TableContainer className="mt-3 rounded-md">
                                <Table className="">
                                    <TableHead>
                                        <TableRow className="colorBackgroundGold">
                                            <TableCell className="w-auto text-lg text-center font-bold">Image</TableCell>
                                            <TableCell className="w-auto text-lg font-bold">Title</TableCell>
                                            <TableCell className="w-[15%] text-lg font-bold">Color</TableCell>
                                            <TableCell className="w-[15%] text-lg font-bold">Size</TableCell>
                                            <TableCell className="w-[15%] text-lg text-center font-bold">Settings</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Wig_Product.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => (
                                            <TableRow key={item.id} className="hover:bg-gray-50">
                                                <TableCell className="w-auto">
                                                    <img src={item.image} className="object-top object-cover h-40 w-40 max-xl:h-36 max-[1075px]:h-32 max-[1000px]:h-24" />
                                                </TableCell>
                                                <TableCell
                                                    className="w-auto text-lg cursor-pointer hover:underline"
                                                    onClick={() => {
                                                        setModalOpen(true);
                                                        // setSelectedId(item.id);
                                                    }}>
                                                    {item.title}
                                                </TableCell>
                                                <TableCell className="w-[15%] text-base">{item.color}</TableCell>
                                                <TableCell className="w-[15%] text-base">{item.size}</TableCell>
                                                <TableCell className="w-[15%] text-center ">
                                                    <ButtonGroup variant="contained" className="gap-1" aria-label="contained button group">
                                                        <Link href="/WigEdit/[id]" as={`/WigEdit/${item.id}`}>
                                                            <Button className="bg-[#303030] text-white hover:bg-amber-500">Edit</Button>
                                                        </Link>
                                                        {/* <Link href="/WigEdit/[id]" as={`/WigEdit/${item.id}`}> */}
                                                        <Button className="bg-[#303030] text-white hover:bg-red-500">Delete</Button>
                                                        {/* </Link> */}
                                                    </ButtonGroup>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                component="div"
                                count={Wig_Product.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Hidden>
                        <Grid item xs={12}>
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
                                            <ButtonGroup variant="contained" className="gap-1" aria-label="contained button group">
                                                <Button
                                                    className="bg-[#303030] text-white hover:bg-blue-500"
                                                    onClick={() => {
                                                        setModalOpen(true);
                                                        // setSelectedId(item.id);
                                                    }}>
                                                    Detail
                                                </Button>
                                                <Link href="/WigEdit/[id]" as={`/WigEdit/${item.id}`}>
                                                    <Button className="bg-[#303030] text-white hover:bg-amber-500">Edit</Button>
                                                </Link>
                                                <Button className="bg-[#303030] text-white hover:bg-red-500">Delete</Button>
                                            </ButtonGroup>
                                        </AccordionActions>
                                    </Accordion>
                                ))}
                            </Hidden>
                        </Grid>

                        <Modal
                            open={modalOpen}
                            onClose={handleModalClose}
                            className="flex justify-center items-center max-lg:overflow-scroll"
                        >
                            <Box className="w-full h-auto bg-gray-100 rounded-lg p-5 max-w-5xl max-lg:max-w-3xl max-[899px]:w-[90%] max-[899px]:h-fit">
                                <Grid container spacing={2}>
                                    <Grid item sm={12} md={6}>
                                        <Box className="w-full flex content-center items-center justify-center max-[899px]:max-w-sm">
                                            <img className="rounded-lg" src="https://cdn.shopify.com/s/files/1/1410/9094/products/Resized-525x700-_0001_ew_purepower_cascade_1.jpg?v=1626906369" />
                                        </Box>
                                    </Grid>
                                    <Grid item sm={12} md={6} className="text-[#303030]">
                                        <Typography className="text-4xl font-bold max-lg:text-xl">Cascade | Remy Human Hair Lace Front Wig (Hand-Tied)</Typography>
                                        <Divider className="my-2 border-[#303030]" />
                                        <Typography className="text-lg italic text-[#696969] max-lg:text-sm">CASCADE by ELLEN WILLE in SANDY BLONDE ROOTED | Medium Honey Blonde, Light Ash Blonde, and Lightest Reddish Brown blend with Dark Roots</Typography>
                                        <Hidden mdDown>
                                            <br />
                                        </Hidden>
                                        <div className='flex my-5 max-lg:my-2 max-md:my-0'>
                                            <div className="text-3xl font-bold max-lg:text-xl max-md:text-lg">BRAND : </div><div className='text-3xl max-lg:text-xl max-md:text-lg'>&nbsp;Ellen Wille</div>
                                        </div>
                                        <div className='flex my-5 max-lg:my-2 max-md:my-0'>
                                            <div className="text-3xl font-bold max-lg:text-xl max-md:text-lg">COLOR : </div><div className='text-3xl max-lg:text-xl max-md:text-lg'>&nbsp;Blondes</div>
                                        </div>
                                        <div className='flex my-5 max-lg:my-2 max-md:my-0'>
                                            <div className="text-3xl font-bold max-lg:text-xl max-md:text-lg">SIZE : </div><div className='text-3xl max-lg:text-xl max-md:text-lg'>&nbsp;Long</div>
                                        </div>
                                        <Hidden mdUp>
                                            <ButtonGroup variant="contained" className="mt-3 flex-none justify-end" fullWidth aria-label="contained button group">
                                                <Button className="text-white bg-amber-500">Edit</Button>
                                                <Button className="text-white bg-red-500">Delete</Button>
                                            </ButtonGroup>
                                        </Hidden>

                                    </Grid>
                                </Grid>
                            </Box>
                        </Modal>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default WigManage_Table