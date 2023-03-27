import React, { useEffect, useState, lazy, Suspense } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
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
  CircularProgress
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { storage } from '../api/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

type Props = {
  members: [Member]
}

type Member = {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

export async function getServerSideProps() {
  try {
    let membersResponse = await fetch("http://localhost:8000/api/member/getAllMember");
    let members = await membersResponse.json();
    return {
      props: { members: JSON.parse(JSON.stringify(members)) }
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

export default function MemberManage(props: Props) {
  const [members, setMembers] = useState<[Member]>(props.members);
  console.log("Number of Members: ", members.length)

  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch data
    // setTimeout(() => {
      setIsLoading(false);
    // }, 800);
  }, [loading]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      let response = await fetch("http://localhost:8000/api/member/deleteMember?id=" + memberId, {
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
      window.location.href = './MemberManage'

    } catch (error) {
      console.log("An error occured while deleting ", error);
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Head><title>Member Manage | High U Administrator</title></Head>
      {/* <DrawerBar /> */}
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
            <Head><title>Member Manage | High U</title></Head>
            <Toolbar />
            <Box className="bg-white w-full h-full rounded-xl pt-5 px-5 shadow-md max-[899px]:pb-3">
              <Grid container>
                <Grid item xs={12} md={12} className="flex items-center justify-between max-md:mb-3">
                  {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-5xl rounded-md" />) : (
                    <Typography className="text-[#303030] font-bold text-2xl max-[450px]:text-lg">
                      Member&nbsp;Manage
                    </Typography>
                  )}
                  {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-5xl rounded-md" />) : (
                    <Link href="./MemberManage/AddMember">
                      <Button className="text-white font-bold px-5 text-center shadow bg-[#303030] hover:bg-[#555555]">Add&nbsp;Member</Button>
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

                      {members?.length > 0 ? (
                        <TableBody>
                          {members.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => (
                            loading ? (<Skeleton key={i} animation="wave" variant="rectangular" className="w-full h-28 my-4 rounded-md" />) : (
                              <TableRow key={item._id} className="hover:bg-gray-50">
                                <TableCell className="flex justify-center items-center">
                                  <Image src={item.image} alt={item.username} width={160} height={160} className="object-top rounded-lg object-cover h-40 w-40 max-xl:h-36 max-xl:w-36 max-[1075px]:h-32 max-[1000px]:h-24" />
                                </TableCell>
                                <TableCell className="w-[12%] text-base">{item.firstname}</TableCell>
                                <TableCell className="w-[12%] text-base">{item.lastname}</TableCell>
                                <TableCell className="w-[12%] text-base">{item.email}</TableCell>
                                <TableCell className="w-[12%] text-base">{item.username}</TableCell>
                                <TableCell className="w-[12%] text-base">{item.password}</TableCell>
                                <TableCell className="w-[15%] text-center ">
                                  <ButtonGroup variant="contained" className="gap-1" aria-label="contained button group">
                                    <Link href="./MemberManage/[id]" as={`./MemberManage/${item._id}`}>
                                      <Button className="bg-[#303030] text-white hover:bg-[#575757]">Edit</Button>
                                    </Link>
                                    <Button onClick={handleOpenModal} className="bg-[#303030] text-white hover:bg-[#575757]">Delete</Button>
                                  </ButtonGroup>
                                  <Modal
                                    open={openModal}
                                    onClose={handleCloseModal}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-slate-100 rounded-lg shadow-lg p-4">
                                      <Typography id="modal-modal-title" className="text-lg text-red-500 font-bold">
                                        Confirm Delete
                                      </Typography>
                                      <Typography id="modal-modal-description" className="text-base text-red-500" >
                                        Are you sure you want to delete this member?
                                      </Typography>
                                      <ButtonGroup fullWidth variant="contained" sx={{ mt: 2 }} aria-label="contained button group">
                                        <Button type="submit" onClick={() => handleDeleteMember(item._id as string)} className="bg-[#b3b3b3] text-white hover:bg-red-500">Delete</Button>
                                        <Button onClick={handleCloseModal} className="bg-[#b3b3b3] text-white hover:bg-[#3d3d3d]">Cancel</Button>
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
                      count={members.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  )}
                </Hidden>
                <Grid item xs={12}>
                  <Hidden mdUp>
                    {members.map((item, i) => (
                      loading ? (<Skeleton key={i} animation="wave" variant="rectangular" className="w-full h-10 my-2 rounded-md" />) : (
                        <Accordion key={item._id} className="shadow-md">
                          <AccordionSummary>
                            <Typography className="font-semibold">{item.username}</Typography>
                          </AccordionSummary>
                          <AccordionDetails className="flex justify-center items-center w-full h-auto">
                            <Image src={item.image} alt={item.username} width={200} height={200} className="rounded-lg object-cover w-[80%]" />
                          </AccordionDetails>
                          <AccordionDetails className="bg-gray-50">
                            <Typography>Firstname: {item.firstname}</Typography><br />
                            <Typography>Lastname: {item.lastname}</Typography><br />
                            <Typography>Email: {item.email}</Typography><br />
                            <Typography>Password: {item.password}</Typography>
                          </AccordionDetails>
                          <AccordionActions>
                            <ButtonGroup variant="contained" className="gap-1" aria-label="contained button group">
                              <Link href="/testID/[id]" as={`/testID/${item._id}`}>
                                <Button className="bg-[#303030] text-white hover:bg-[#575757]">Edit</Button>
                              </Link>
                              <Button onClick={handleOpenModal} className="bg-[#303030] text-white hover:bg-[#575757]">Delete</Button>
                            </ButtonGroup>
                            <Modal
                              open={openModal}
                              onClose={handleCloseModal}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-slate-100 rounded-lg shadow-lg p-4">
                                <Typography id="modal-modal-title" className="text-lg text-red-500 font-bold">
                                  Confirm Delete
                                </Typography>
                                <Typography id="modal-modal-description" className="text-base italic text-red-500" >
                                  Are you sure you want to delete this member?
                                </Typography>
                                <ButtonGroup fullWidth variant="contained" sx={{ mt: 2 }} aria-label="contained button group">
                                  <Button type="submit" onClick={() => handleDeleteMember(item._id as string)} className="bg-[#b3b3b3] text-white hover:bg-red-500">Delete</Button>
                                  <Button onClick={handleCloseModal} className="bg-[#b3b3b3] text-white hover:bg-[#3d3d3d]">Cancel</Button>
                                </ButtonGroup>
                              </Box>
                            </Modal>
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

