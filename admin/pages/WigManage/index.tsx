import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import MaterialReactTable, {
    type MaterialReactTableProps,
    type MRT_Cell,
    type MRT_ColumnDef,
    type MRT_Row,
} from 'material-react-table';
import {
    Box,
    Typography,
    Toolbar,
    Grid,
    Button,
    Tooltip,
    IconButton,
    Dialog,
    TextField,
    DialogTitle,
    DialogContent,
    Stack,
    DialogActions,
    Modal,
    Divider,
    AvatarGroup,
    Avatar,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Delete, Edit } from '@mui/icons-material';
import PreviewIcon from '@mui/icons-material/Preview';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";

type Props = {
    wigs: [Wig]
}

type Wig = {
    _id: string;
    ar_image: string;
    main_image: string;
    sub_image: string[];
    title: string;
    style: string;
    type: string;
    color: string;
    size: number[];
    price: number;
    desc: string;
    view: number;
    favorite: number;
    use: number;
}

export async function getServerSideProps() {
    try {
        let wigsResponse = await fetch("http://localhost:8000/api/wig/getAllWigs");
        let wigs = await wigsResponse.json();
        return {
            props: { wigs: JSON.parse(JSON.stringify(wigs)) }
        }
    } catch (e) {
        console.error(e);
    }
    return {
        props: { wigs: [] }
    };
}

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


export default function WigManage(props: Props) {
    const defaultARImage = 'https://firebasestorage.googleapis.com/v0/b/high-u.appspot.com/o/default_images%2Fdefault-ar-icon.jpg?alt=media&token=03355034-4fda-4ae7-b1d5-86932687046e';
    const [tableData, setTableData] = useState<Wig[]>(props.wigs);

    useEffect(() => {
        async function fetchData() {
            try {
                const wigsResponse = await fetch("http://localhost:8000/api/wig/getAllWigs");
                const wigs = await wigsResponse.json();
                setTableData(wigs);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, []);

    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Wig | null>(null);
    const handleOpenDetailModal = (row: MRT_Row<Wig>) => {
        setSelectedRow(row.original);
        setOpenDetailModal(true);
    };
    const handleCloseDetailModal = () => setOpenDetailModal(false);

    const columns = useMemo<MRT_ColumnDef<Wig>[]>(
        () => [
            {
                accessorKey: '_id',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
            },
            {
                accessorKey: 'main_image',
                header: 'Main Image',
                enableEditing: false,
                enableColumnActions: false,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 10,
                Cell: ({ row }) => (
                    <Box className="flex justify-center">
                        <Image
                            alt="main_image"
                            height={48}
                            width={48}
                            src={row.original.main_image}
                            className="object-cover w-12 h-12 rounded-full"
                        />
                    </Box>
                ),
            },
            {
                accessorKey: 'ar_image',
                header: 'AR Image',
                enableEditing: false,
                enableColumnActions: false,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 10,
                Cell: ({ row }) => (
                    <Box className="flex justify-center">
                        <Image
                            alt="ar_image"
                            height={48}
                            width={48}
                            src={row.original.ar_image || defaultARImage}
                            className="object-cover w-12 h-12 rounded-full"
                        />
                    </Box>
                ),
            },
            {
                accessorKey: 'sub_image',
                header: 'Sub Image',
                enableEditing: false,
                enableColumnActions: false,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 100,
                Cell: ({ row }) => (
                    <Box className="flex justify-center items-center">
                        <AvatarGroup max={3}>
                            {row.original.sub_image.map((item, i) => (
                                <Avatar
                                    key={i}
                                    alt="sub_image"
                                    src={item}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ))}
                        </AvatarGroup>
                    </Box>
                ),
            },
            {
                accessorKey: 'title',
                header: 'Title',
                size: 500,
                enableGlobalFilter: false,
            },
            {
                accessorKey: 'style',
                header: 'Style',
                size: 40,
            },
            {
                accessorKey: 'type',
                header: 'Type',
                size: 40,
            },
            {
                accessorKey: 'color',
                header: 'Color',
                size: 10,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'size',
                header: 'Size',
                size: 50,
                Cell: ({ row }) => (
                    <Box className="flex">
                        Length:&nbsp;{row.original.size[0]} <br />
                        Circumference:&nbsp;{row.original.size[1]} <br />
                        Ear&nbsp;to&nbsp;Ear:&nbsp;{row.original.size[2]} <br />
                        Front&nbsp;to&nbsp;Back:&nbsp;{row.original.size[3]}
                    </Box>
                ),
            },
            {
                accessorKey: 'price',
                header: 'Price',
                size: 10,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                Cell: ({ cell }) => (
                    <Box
                        component="span"
                        sx={{
                            backgroundColor: '#303030',
                            borderRadius: '0.25rem',
                            color: '#fff',
                            maxWidth: '9ch',
                            p: '0.25rem',
                        }}
                    >
                        {cell.getValue<number>()?.toLocaleString?.('th-TH', {
                            style: 'currency',
                            currency: 'THB',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </Box>
                ),
            },
            {
                accessorKey: 'desc',
                header: 'Description',
                muiTableHeadCellProps: {
                    hidden: true,
                },
                muiTableBodyCellProps: {
                    hidden: true,
                },
            },
            {
                accessorKey: 'view',
                header: 'View',
                size: 10,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'favorite',
                header: 'Favorite',
                size: 10,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'use',
                header: 'Try AR',
                size: 10,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
        ],
        []
    );

    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: columns.map((c) => c.header),
    };

    const csvExporter = new ExportToCsv(csvOptions);

    const handleExportRows = (rows: MRT_Row<Wig>[]) => {
        csvExporter.generateCsv(rows.map((row) => row.original));
    };

    const handleExportData = () => {
        csvExporter.generateCsv(tableData);
    };

    const handleDeleteRow = useCallback(
        async (row: MRT_Row<Wig>) => {
            if (!confirm(`Are you sure you want to delete ${row.getValue('title')}`)) {
                return;
            }

            try {
                await handleDeleteWig(row.original._id);
                // Refetch or update local table data for re-render
                tableData.splice(row.index, 1);
                setTableData([...tableData]);
            } catch (error) {
                console.error(error);
                // Handle error here
            }
        },
        [tableData],
    );

    const handleDeleteWig = async (wigId: string) => {
        try {
            let response = await fetch("http://localhost:8000/api/wig/deleteWig?id=" + wigId, {
                method: "DELETE",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
            response = await response.json();
            console.log(response);
        } catch (error) {
            console.log("An error occured while deleting ", error);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Head><title>Wig Manage | High U Administrator</title></Head>
            <Box
                component="main"
                className="h-full p-5 ml-[240px] max-[899px]:ml-0"
                sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Box className="bg-white w-full h-full rounded-xl p-5 shadow-md max-[899px]:pb-3">
                    <Grid item xs={12} md={12} className="flex items-center  max-md:mb-3">
                        <Typography className="text-[#303030] font-bold text-2xl pb-2 max-[450px]:text-lg">
                            Wig&nbsp;Manage
                        </Typography>
                    </Grid>
                    <>
                        <MaterialReactTable
                            displayColumnDefOptions={{
                                'mrt-row-actions': {
                                    muiTableHeadCellProps: {
                                        align: 'center',
                                    },
                                    muiTableBodyCellProps: {
                                        align: 'center',
                                    }
                                },
                                'mrt-row-numbers': {
                                    muiTableHeadCellProps: {
                                        align: 'center',
                                    },
                                    muiTableBodyCellProps: {
                                        align: 'center',
                                    }
                                },
                            }}
                            columns={columns}
                            data={tableData}
                            initialState={{
                                columnVisibility: {
                                    _id: false,
                                    ar_image: false,
                                    sub_image: false,
                                    style: false,
                                    color: false,
                                    size: false,
                                    price: false,
                                },
                            }}
                            // enableColumnVirtualization
                            enableRowNumbers
                            enableRowSelection
                            enableRowActions
                            positionToolbarAlertBanner="bottom"
                            renderRowActions={({ row, table }) => (
                                <Box className="flex justify-center">
                                    <Tooltip arrow placement="left" title="Detail">
                                        <IconButton className="hover:text-blue-500" onClick={() => handleOpenDetailModal(row)}>
                                            <PreviewIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Modal
                                        open={openDetailModal}
                                        onClose={handleCloseDetailModal}
                                        className="flex justify-center items-center max-lg:overflow-scroll"
                                    >
                                        <Box className="w-full h-auto bg-gray-100 rounded-lg p-5 max-w-5xl max-lg:max-w-3xl max-[899px]:w-[90%] max-[899px]:h-fit">
                                            <Grid container spacing={2}>
                                                <Grid item sm={12} md={6}>
                                                    <Box className="w-full flex content-center items-center justify-center max-[899px]:max-w-sm">
                                                        <Grid container spacing={2}>
                                                            <Grid item md={6}>
                                                                <Tooltip arrow title="Main&nbsp;Image">
                                                                    <Image
                                                                        src={selectedRow?.main_image || defaultARImage}
                                                                        alt="main_image"
                                                                        width={200}
                                                                        height={200}
                                                                        className="w-full rounded-md object-cover"
                                                                    />
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item md={6}>
                                                                <Tooltip arrow title="AR&nbsp;Image">
                                                                    <Image
                                                                        src={selectedRow?.ar_image || defaultARImage}
                                                                        alt="main_image"
                                                                        width={200}
                                                                        height={200}
                                                                        className="w-full rounded-md object-cover"
                                                                    />
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item md={12}>
                                                                <Swiper
                                                                    style={{
                                                                        "--swiper-navigation-color": "#fff",
                                                                        "--swiper-pagination-color": "#fff",
                                                                    } as any}
                                                                    spaceBetween={15}
                                                                    slidesPerView={3}
                                                                    navigation={true}
                                                                    modules={[Navigation]}
                                                                >
                                                                    {selectedRow?.sub_image.map((image, i) => (
                                                                        <SwiperSlide key={i}>
                                                                            <Tooltip arrow title={"Sub Image " + (i + 1)}>
                                                                                <Image
                                                                                    src={image}
                                                                                    alt={`sub_image_${i}`}
                                                                                    width={200}
                                                                                    height={200}
                                                                                    className="w-full rounded-md object-cover"
                                                                                />
                                                                            </Tooltip>
                                                                        </SwiperSlide>
                                                                    ))}
                                                                </Swiper>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item sm={12} md={6} className="text-[#303030]">
                                                    <Typography className="text-2xl font-bold max-lg:text-lg">{selectedRow?.title}</Typography>
                                                    <Divider className="my-2 border-[#303030]" />
                                                    <Typography className="text-base text-[#696969] max-lg:text-sm">{selectedRow?.desc}</Typography>
                                                    <Grid container spacing={2} className="py-2">
                                                        <Grid item md={4}>
                                                            <Typography className="text-[#303030] font-bold pb-1">Style</Typography>
                                                            <TextField
                                                                type='text'
                                                                fullWidth
                                                                value={selectedRow?.style}
                                                                variant='filled'
                                                                className="font-bold rounded text-[#303030]"
                                                                inputProps={{
                                                                    readOnly: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item md={4}>
                                                            <Typography className="text-[#303030] font-bold pb-1">Type</Typography>
                                                            <TextField
                                                                type='text'
                                                                fullWidth
                                                                value={selectedRow?.type}
                                                                variant='filled'
                                                                className="font-bold rounded text-[#303030]"
                                                                inputProps={{
                                                                    readOnly: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item md={4}>
                                                            <Typography className="text-[#303030] font-bold pb-1">Color</Typography>
                                                            <TextField
                                                                type='text'
                                                                fullWidth
                                                                value={selectedRow?.color}
                                                                variant='filled'
                                                                className="font-bold rounded text-[#303030]"
                                                                inputProps={{
                                                                    readOnly: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item md={12}>
                                                            <Typography className="text-[#303030] font-bold pb-1">Size (Inch)</Typography>
                                                            <Grid container spacing={2}>
                                                                <Grid item md={3}>
                                                                    <TextField
                                                                        type='text'
                                                                        label="Length"
                                                                        value={selectedRow?.size[0]}
                                                                        fullWidth
                                                                        variant='filled'
                                                                        className="font-bold rounded text-[#303030]"
                                                                        inputProps={{
                                                                            readOnly: true,
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item md={3}>
                                                                    <TextField
                                                                        type='text'
                                                                        label="Circumference"
                                                                        value={selectedRow?.size[1]}
                                                                        fullWidth
                                                                        variant='filled'
                                                                        className="font-bold rounded text-[#303030]"
                                                                        inputProps={{
                                                                            readOnly: true,
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item md={3}>
                                                                    <TextField
                                                                        type='text'
                                                                        label="Ear-to-Ear"
                                                                        value={selectedRow?.size[2]}
                                                                        fullWidth
                                                                        variant='filled'
                                                                        className="font-bold rounded text-[#303030]"
                                                                        inputProps={{
                                                                            readOnly: true,
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <Grid item md={3}>
                                                                    <TextField
                                                                        type='text'
                                                                        label="Front-to-Back"
                                                                        value={selectedRow?.size[3]}
                                                                        fullWidth
                                                                        variant='filled'
                                                                        className="font-bold rounded text-[#303030]"
                                                                        inputProps={{
                                                                            readOnly: true,
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <Typography className="text-[#303030] font-bold pb-1">Price(฿)</Typography>
                                                            <TextField
                                                                type='text'
                                                                fullWidth
                                                                value={selectedRow?.price}
                                                                variant='filled'
                                                                className="font-bold rounded text-[#303030]"
                                                                inputProps={{
                                                                    readOnly: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <Typography className="text-[#303030] font-bold pb-1">View</Typography>
                                                            <TextField
                                                                type='text'
                                                                fullWidth
                                                                value={selectedRow?.view}
                                                                variant='filled'
                                                                className="font-bold rounded text-[#303030]"
                                                                inputProps={{
                                                                    readOnly: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <Typography className="text-[#303030] font-bold pb-1">Favorite</Typography>
                                                            <TextField
                                                                type='text'
                                                                fullWidth
                                                                value={selectedRow?.favorite}
                                                                variant='filled'
                                                                className="font-bold rounded text-[#303030]"
                                                                inputProps={{
                                                                    readOnly: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <Typography className="text-[#303030] font-bold pb-1">Try&nbsp;AR</Typography>
                                                            <TextField
                                                                type='text'
                                                                fullWidth
                                                                value={selectedRow?.use}
                                                                variant='filled'
                                                                className="font-bold rounded text-[#303030]"
                                                                inputProps={{
                                                                    readOnly: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Modal>
                                    <Tooltip arrow placement="bottom" title="Edit">
                                        <>
                                            <Link href={`./WigManage/[id]`} as={`./WigManage/${row.original._id}`}>
                                                <IconButton className="hover:text-amber-500">
                                                    <Edit />
                                                </IconButton>
                                            </Link>
                                        </>
                                    </Tooltip>
                                    <Tooltip arrow placement="right" title="Delete">
                                        <IconButton className="hover:text-red-500" onClick={() => handleDeleteRow(row)}>
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            )}
                            renderTopToolbarCustomActions={({ table }) => (
                                <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}>
                                    <Link href="./WigManage/AddWig">
                                        <Button
                                            className="bg-[#303030] hover:bg-[#666666] text-white"
                                            variant="contained"
                                        >
                                            Create New Wig
                                        </Button>
                                    </Link>
                                    <Button
                                        className="bg-[#ffffff] hover:bg-[#303030] text-black hover:text-white"
                                        //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                                        onClick={handleExportData}
                                        startIcon={<FileDownloadIcon />}
                                        variant="contained"
                                    >
                                        Export All Data
                                    </Button>
                                    <Button
                                        className="bg-[#ffffff] hover:bg-[#303030] text-black hover:text-white"
                                        disabled={
                                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                        }
                                        //only export selected rows
                                        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                                        startIcon={<FileDownloadIcon />}
                                        variant="contained"
                                    >
                                        Export Selected Rows
                                    </Button>
                                </Box>
                            )}
                        />
                    </>
                </Box>
            </Box>
        </ThemeProvider>
    )
}