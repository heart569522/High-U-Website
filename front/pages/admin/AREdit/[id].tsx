import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getAR, updateAR } from '../../api/arApi'
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  Hidden,
  ButtonGroup,
  Button,
  TextField,
  Skeleton,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import DrawerBar from '../../../components/Navigation/DrawerBar';
import Loading from '../../../components/Other/Loading';

const drawerWidth = 240;
const theme = createTheme({
  typography: {
    fontFamily: [
      'Prompt, sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: "#303030",
    },
    secondary: {
      main: "#F0CA83"
    }
  },
});

interface AR {
  id: number;
  image: string;
  title: string;
  color: string;
  use: number;
}

const AREdit = () => {
  const [ar, setAR] = useState<AR>({
    id: 0,
    image: '',
    title: '',
    color: '',
    use: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [loading]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter()

  const [editTitle, setEditTitle] = useState('');
  const [editColor, setEditColor] = useState('');

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchAR = async () => {
      setIsLoading(true);
      try {
        const id = typeof router.query.id === 'string' ? Number(router.query.id) : undefined;
        if (!id) {
          window.location.href = '/admin/ARManage'
          return;
        }
        const ar = await getAR(id as number);
        setAR(ar as AR);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };
    fetchAR();

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      const choice = window.confirm("Are you sure you want to leave the page? Your changes will not be saved.");
      if (!choice) event.returnValue = false;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };

  }, []);

  useEffect(() => {
    if (!previewUrl) {
      return;
    }
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) {
      setImage(null);
      setPreviewUrl(null);
      return;
    }
    setImage(e.target.files ? e.target.files[0] : null);
    setPreviewUrl(URL.createObjectURL(image));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) formData.append('image', new Blob([image]), image.name);
      formData.append('title', editTitle);
      formData.append('color', editColor);
      // await updateAR(ar.id, formData);

      alert('AR updated successfully');
      router.push('/admin/ARmanage');
    } catch (err) {
      setError(err as Error);
    }
  };

  // const handleReset = () => {
  //   setEditTitle('');
  //   setEditDesc('');
  //   setEditColor('');
  //   setEditBrand('');
  //   setEditSize('');
  //   setImage(null);
  //   setPreviewUrl(member.image);
  //   setError(null);
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAR({ ...ar, [name]: value });
  };

  if (isLoading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <DrawerBar />
      <Box
        component="main"
        className="h-full p-5 ml-[240px] max-[899px]:ml-0"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box className="bg-white w-full h-full rounded-xl pt-5 pb-5 px-5 shadow-md max-[899px]:pb-3">
          <Grid container>
            <Grid item xs={12}>
              {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-5xl rounded-md" />) : (
                <Typography className="text-[#303030] font-bold text-xl">
                  AR Manage
                </Typography>
              )}
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit} className="pt-3">
            <Grid container className="pt-3" spacing={3}>
              <Grid item xs={12} md={4}>
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-72 rounded-md" />) : (
                  <center>
                    <input
                      accept="image/*"
                      style={{ display: "none", }}
                      id="upload-button"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <img
                      src={previewUrl || ar.image}
                      className="rounded-lg object-top object-cover h-auto w-96"
                    />
                    <label htmlFor="upload-button">
                      <Button
                        variant='contained'
                        className="bg-[#F0CA83] text-[#303030] font-bold mb-2 hover:bg-[#f3b94d] mt-3"
                        component="span"
                        startIcon={<AddAPhotoIcon />}
                      >
                        Edit Image
                      </Button>
                    </label>
                  </center>
                )}
              </Grid>
              <Grid item xs={12} md={8}>
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                  <Grid item xs={12}>
                    <Typography className="text-[#303030] font-bold pb-2 text-lg">Title</Typography>
                    <TextField
                      type='text'
                      value={ar.title}
                      fullWidth
                      name='title'
                      variant='outlined'
                      className="font-bold rounded pb-3"
                      onChange={handleInputChange}
                      inputProps={{ style: { color: "#303030" } }}
                      sx={{ color: '#303030' }}
                      required
                      focused
                    />
                  </Grid>
                )}
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                  <Grid item xs={12}>
                    <Typography className="text-[#303030] font-bold pb-2 text-lg">Color</Typography>
                    <TextField
                      type='text'
                      value={ar.color}
                      fullWidth
                      name='color'
                      variant='outlined'
                      className="font-bold rounded pb-3"
                      onChange={handleInputChange}
                      inputProps={{ style: { color: "#303030" } }}
                      sx={{ color: '#303030' }}
                      required
                      focused
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Hidden mdDown>
                    {loading ? (<Skeleton animation="wave" variant="rectangular" sx={{ float: 'right' }} className="w-1/5 justify-end h-10 my-1 rounded-md" />) : (
                      <ButtonGroup variant="contained" className="gap-1" sx={{ float: 'right' }} aria-label="contained button group">
                        <Button type='submit' className="bg-[#303030] text-white hover:bg-emerald-600">Update</Button>
                        {/* <Button type='reset' className="bg-[#303030] text-white hover:bg-red-500">Reset</Button> */}
                      </ButtonGroup>
                    )}
                  </Hidden>
                  <Hidden mdUp>
                    {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-10 my-1 rounded-md" />) : (
                      <ButtonGroup variant="contained" className="gap-1 my-2" fullWidth aria-label="contained button group">
                        <Button type='submit' className="bg-[#303030] text-white hover:bg-emerald-600">Update</Button>
                        {/* <Button type='reset' className="bg-[#303030] text-white hover:bg-red-500">Reset</Button> */}
                      </ButtonGroup>
                    )}
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </ThemeProvider>

  )
}

export default AREdit