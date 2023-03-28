import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, CircularProgress, Divider, Grid, Hidden, Modal, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
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
    props: {}
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
  const [wigs, setWigs] = useState<[Wig]>(props.wigs);
  console.log("Number of Wigs: ", wigs.length)
  const defaultARImage = 'https://firebasestorage.googleapis.com/v0/b/high-u.appspot.com/o/default_images%2Fdefault-ar-icon.jpg?alt=media&token=03355034-4fda-4ae7-b1d5-86932687046e';

  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch data
    // setTimeout(() => {
    setIsLoading(false);
    // }, 800);
  }, [loading]);

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const handleOpenDetailModal = () => setOpenDetailModal(true);
  const handleCloseDetailModal = () => setOpenDetailModal(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteWig = async (wigId: string) => {
    try {
      let response = await fetch("http://localhost:8000/api/wig/deleteWig?id=" + wigId, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      // Delete the old image from storage
      // const imageRef = ref(storage, `member_images/${members}`)
      // await deleteObject(imageRef)

      response = await response.json();
      console.log(response);
      window.location.href = './WigManage'

    } catch (error) {
      console.log("An error occured while deleting ", error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Head><title>Wig Manage | High U Administrator</title></Head>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
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
                      Wigs&nbsp;Manage
                    </Typography>
                  )}
                  {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-5xl rounded-md" />) : (
                    <Link href="./WigManage/AddWig">
                      <Button className="text-white font-bold px-5 text-center shadow bg-[#303030] hover:bg-[#555555]">Add Wig</Button>
                    </Link>
                  )}
                </Grid>
                <Hidden mdDown >
                  <TableContainer className="mt-3 rounded-md">
                    <Table>
                      {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-12 rounded-md" />) : (
                        <TableHead>
                          <TableRow className="bg-[#F0CA83]">
                            <TableCell className="w-auto text-lg text-center font-bold">Image</TableCell>
                            <TableCell className="w-auto text-lg font-bold">Title</TableCell>
                            <TableCell className="w-[15%] text-lg text-center font-bold">Type</TableCell>
                            <TableCell className="w-[10%] text-lg text-center font-bold">View</TableCell>
                            <TableCell className="w-[10%] text-lg text-center font-bold">Favorite</TableCell>
                            <TableCell className="w-[10%] text-lg text-center font-bold">Try&nbsp;AR</TableCell>
                            <TableCell className="w-[15%] text-lg text-center font-bold">Settings</TableCell>
                          </TableRow>
                        </TableHead>
                      )}
                      {wigs?.length > 0 ? (
                        <TableBody>
                          {wigs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => (
                            loading ? (<Skeleton key={i} animation="wave" variant="rectangular" className="w-full h-32 my-4 rounded-md" />) : (
                              <TableRow key={item._id} className="hover:bg-gray-50">
                                <TableCell className="flex justify-center">
                                  <Image src={item.main_image} alt="wig" width={160} height={160} className="object-top rounded-lg object-cover h-40 w-40 max-xl:h-36 max-xl:w-36 max-[1075px]:h-32 max-[1000px]:h-24" />
                                </TableCell>
                                <TableCell
                                  className="w-auto text-base cursor-pointer hover:underline max-[1000px]:text-sm"
                                  onClick={() => {
                                    setOpenDetailModal(true);
                                    // setSelectedId(item.id);
                                  }}>
                                  {item.title}
                                </TableCell>
                                {/* Detail Wig Modal */}
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
                                              <Tooltip title="Main&nbsp;Image">
                                                <Image src={item.main_image} alt="main_image" width={200} height={200} className="w-full rounded-md object-cover" />
                                              </Tooltip>
                                            </Grid>
                                            <Grid item md={6}>
                                              <Tooltip title="AR&nbsp;Image">
                                                <Image src={item.ar_image || defaultARImage} alt="main_image" width={200} height={200} className="w-full rounded-md object-cover" />
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
                                                {item.sub_image.map((image, index) => (
                                                  <SwiperSlide key={index}>
                                                    <Tooltip title={"Sub Image " + (index+1)}>
                                                      <Image src={image} alt={`sub_image_${index}`} width={200} height={200} className="w-full rounded-md object-cover" />
                                                    </Tooltip>
                                                  </SwiperSlide>
                                                ))}
                                              </Swiper>
                                            </Grid>
                                          </Grid>
                                        </Box>
                                      </Grid>
                                      <Grid item sm={12} md={6} className="text-[#303030]">
                                        <Typography className="text-4xl font-bold max-lg:text-xl">{item.title}</Typography>
                                        <Divider className="my-2 border-[#303030]" />
                                        <Typography className="text-lg italic text-[#696969] max-lg:text-sm">{item.desc}</Typography>
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
                                        <div className='flex my-5 max-lg:my-2 max-md:my-0'>
                                          <div className="text-3xl font-bold max-lg:text-xl max-md:text-lg">VIEW : </div><div className='text-3xl max-lg:text-xl max-md:text-lg'>&nbsp;21</div>
                                        </div>
                                        <div className='flex my-5 max-lg:my-2 max-md:my-0'>
                                          <div className="text-3xl font-bold max-lg:text-xl max-md:text-lg">FAVORITE : </div><div className='text-3xl max-lg:text-xl max-md:text-lg'>&nbsp;6</div>
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
                                <TableCell className="w-[15%] text-base text-center">{item.type}</TableCell>
                                <TableCell className="w-[10%] text-base text-center">{item.view}</TableCell>
                                <TableCell className="w-[10%] text-center text-base">{item.favorite}</TableCell>
                                <TableCell className="w-[10%] text-center text-base">{item.use}</TableCell>
                                <TableCell className="w-[15%] text-center ">
                                  <ButtonGroup variant="contained" className="gap-1" aria-label="contained button group">
                                    <Link href="./WigManage/[id]" as={`./WigManage/${item._id}`}>
                                      <Button className="bg-[#303030] text-white hover:bg-[#575757]">Edit</Button>
                                    </Link>
                                    <Button onClick={handleOpenDeleteModal} className="bg-[#303030] text-white hover:bg-[#575757]">Delete</Button>
                                  </ButtonGroup>
                                  <Modal
                                    open={openDeleteModal}
                                    onClose={handleCloseDeleteModal}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-slate-100 rounded-lg shadow-lg p-4">
                                      <Typography id="modal-modal-title" className="text-lg text-black font-bold">
                                        Confirm Delete
                                      </Typography>
                                      <Typography id="modal-modal-description" className="text-base text-black" >
                                        Are you sure you want to delete this wig?
                                      </Typography>
                                      <ButtonGroup fullWidth variant="contained" sx={{ mt: 2 }} aria-label="contained button group">
                                        <Button type="submit" onClick={() => handleDeleteWig(item._id as string)} className="bg-[#303030] text-white hover:bg-red-500">Delete</Button>
                                        <Button onClick={handleCloseDeleteModal} className="bg-[#303030] text-white hover:bg-[#3d3d3d]">Cancel</Button>
                                      </ButtonGroup>
                                    </Box>
                                  </Modal>
                                </TableCell>
                              </TableRow>
                            )
                          ))}
                        </TableBody>
                      ) : (
                        loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-12 my-4 rounded-md" />) : (
                          <TableBody>
                            <TableCell className="text-base text-center">-</TableCell>
                            <TableCell className="text-base text-center">-</TableCell>
                            <TableCell className="text-base text-center">-</TableCell>
                            <TableCell className="text-base text-center">-</TableCell>
                            <TableCell className="text-base text-center">-</TableCell>
                            <TableCell className="text-base text-center">-</TableCell>
                            <TableCell className="text-base text-center">-</TableCell>
                          </TableBody>
                        )
                      )}
                    </Table>
                  </TableContainer>
                  {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-2xl mb-2 rounded-md" />) : (
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      component="div"
                      count={wigs.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  )}
                </Hidden>
                <Grid item xs={12}>
                  <Hidden mdUp>
                    {wigs.map((item, i) => (
                      loading ? (<Skeleton key={i} animation="wave" variant="rectangular" className="w-full h-10 my-2 rounded-md" />) : (
                        <Accordion key={item._id} className="shadow-md">
                          <AccordionSummary>
                            <Typography className="font-semibold">{item.title}</Typography>
                          </AccordionSummary>
                          {/* <AccordionDetails className="w-52 h-auto">
                                            <img src={item.image} alt={item.title} />
                                        </AccordionDetails> */}
                          <AccordionDetails className="bg-gray-50">
                            <Typography>Color: {item.color}</Typography><br />
                            <Typography>Size: {item.size}</Typography><br />
                          </AccordionDetails>
                          <AccordionActions>
                            <ButtonGroup variant="contained" className="gap-1" aria-label="contained button group">
                              <Button
                                className="bg-[#303030] text-white hover:bg-blue-500"
                                onClick={() => {
                                  setOpenDetailModal(true);
                                  // setSelectedId(item.id);
                                }}>
                                Detail
                              </Button>
                              <Link href="./WigEdit/[id]" as={`./WigEdit/${item._id}`}>
                                <Button className="bg-[#303030] text-white hover:bg-amber-500">Edit</Button>
                              </Link>
                              <Button onClick={handleOpenDeleteModal} className="bg-[#303030] text-white hover:bg-[#575757]">Delete</Button>
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
        </>
      )}
    </ThemeProvider>
  )
}
