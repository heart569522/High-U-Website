import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

    </ThemeProvider>
  )
}
