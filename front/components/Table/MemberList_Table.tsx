import React, { useEffect, useState } from 'react'
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
    Skeleton,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Member_Data from '../../helper/Member_Data.json';

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


function MemberList_Table() {
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch data
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    }, [loading]);

    const [selectedId, setSelectedId] = useState(0);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                            {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-5xl rounded-md" />) : (
                                <Typography className="text-[#303030] font-bold text-2xl">
                                    Member Manage
                                </Typography>
                            )}
                            {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-5xl rounded-md" />) : (
                                <Link href="/admin/AddMember">
                                    <Button className="text-white font-bold px-5 text-center shadow bg-[#303030] hover:bg-[#555555]">Add Member</Button>
                                </Link>
                            )}
                        </Grid>
                        <Hidden mdDown >
                            <TableContainer className="mt-3 rounded-md">
                                <Table>
                                    {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-12 rounded-md" />) : (
                                        <TableHead>
                                            <TableRow className=" bg-[#F0CA83]">
                                                <TableCell className="w-[25%] text-lg text-center font-bold">Image</TableCell>
                                                <TableCell className="w-[12%] text-lg font-bold">Firstname</TableCell>
                                                <TableCell className="w-[12%] text-lg font-bold">Lastname</TableCell>
                                                <TableCell className="w-[12%] text-lg font-bold">Email</TableCell>
                                                <TableCell className="w-[12%] text-lg font-bold">Username</TableCell>
                                                <TableCell className="w-[12%] text-lg font-bold">Password</TableCell>
                                                <TableCell className="w-[15%] text-lg text-center font-bold">Settings</TableCell>
                                            </TableRow>
                                        </TableHead>
                                    )}
                                    <TableBody>
                                        {Member_Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => (
                                            loading ? (<Skeleton key={item.id} animation="wave" variant="rectangular" className="w-full h-28 my-4 rounded-md" />) : (
                                                <TableRow key={item.id} className="hover:bg-gray-50">
                                                    <TableCell className="flex justify-center items-center">
                                                        <img src={item.image} className="object-top rounded-lg object-cover h-40 w-40 max-xl:h-36 max-xl:w-36 max-[1075px]:h-32 max-[1000px]:h-24" />
                                                    </TableCell>
                                                    <TableCell className="w-[12%] text-base">{item.firstname}</TableCell>
                                                    <TableCell className="w-[12%] text-base">{item.lastname}</TableCell>
                                                    <TableCell className="w-[12%] text-base">{item.email}</TableCell>
                                                    <TableCell className="w-[12%] text-base">{item.username}</TableCell>
                                                    <TableCell className="w-[12%] text-base">{item.password}</TableCell>
                                                    <TableCell className="w-[15%] text-center ">
                                                        <ButtonGroup variant="contained" className="gap-1" aria-label="contained button group">
                                                            <Link href="/admin/MemberEdit/[id]" as={`/admin/MemberEdit/${item.id}`}>
                                                                <Button className="bg-[#303030] text-white hover:bg-amber-500">Edit</Button>
                                                            </Link>
                                                            {/* <Link href="/WigEdit/[id]" as={`/WigEdit/${item.id}`}> */}
                                                            <Button className="bg-[#303030] text-white hover:bg-red-500">Delete</Button>
                                                            {/* </Link> */}
                                                        </ButtonGroup>

                                                    </TableCell>
                                                </TableRow>
                                            )
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-2xl mb-2 rounded-md" />) : (
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                    component="div"
                                    count={Member_Data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            )}
                        </Hidden>
                        <Grid item xs={12}>
                            <Hidden mdUp>
                                {Member_Data.map((item, i) => (
                                    loading ? (<Skeleton key={item.id} animation="wave" variant="rectangular" className="w-full h-10 my-2 rounded-md" />) : (
                                        <Accordion key={item.id} className="shadow-md">
                                            <AccordionSummary>
                                                <Typography className="font-semibold">{item.username}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails className="w-52 h-auto">
                                                <img src={item.image} alt={item.username} />
                                            </AccordionDetails>
                                            <AccordionDetails className="bg-gray-50">
                                                <Typography>Firstname: {item.firstname}</Typography><br />
                                                <Typography>Lastname: {item.lastname}</Typography><br />
                                                <Typography>Email: {item.email}</Typography><br />
                                                <Typography>Password: {item.password}</Typography>
                                            </AccordionDetails>
                                            <AccordionActions>
                                                <ButtonGroup variant="contained" className="gap-1" aria-label="contained button group">
                                                    <Link href="/admin/MemberEdit/[id]" as={`/admin/MemberEdit/${item.id}`}>
                                                        <Button className="bg-[#303030] text-white hover:bg-amber-500">Edit</Button>
                                                    </Link>
                                                    <Button className="bg-[#303030] text-white hover:bg-red-500">Delete</Button>
                                                </ButtonGroup>
                                            </AccordionActions>
                                        </Accordion>
                                    )
                                ))}
                            </Hidden>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default MemberList_Table