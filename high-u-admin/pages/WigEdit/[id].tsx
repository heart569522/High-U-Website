import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getWig, updateWig } from '../api/wigApi'
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  Hidden,
  ButtonGroup,
  Button,
  Modal,
  Divider,
  TextField,
  FormControl,
  FormHelperText,
  Avatar,
  Link
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import DrawerBar from '../../components/DrawerBar';
import Loading from '../../components/Loading';
import { title } from 'process';

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

interface Wig {
  id: number;
  image: string;
  title: string;
  desc: string;
  color: string;
  size: string;
  brand: string;
}

const WigEdit = () => {
  const [wig, setWig] = useState<Wig>({
    id: 0,
    image: '',
    title: '',
    desc: '',
    color: '',
    size: '',
    brand: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter()

  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editColor, setEditColor] = useState('');
  const [editSize, setEditSize] = useState('');
  const [editBrand, setEditBrand] = useState('');

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchWig = async () => {
      setLoading(true);
      try {
        const id = typeof router.query.id === 'string' ? Number(router.query.id) : undefined;
        if (!id) {
          window.location.href = '/WigManage'
          return;
        }
        const wig = await getWig(id as number);
        setWig(wig as Wig);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };
    fetchWig();

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
      formData.append('desc', editDesc);
      formData.append('color', editColor);
      formData.append('size', editSize);
      formData.append('brand', editBrand);
      // await updateWig(wig.id, formData);

      alert('Wig updated successfully');
      router.push('/WigManage');
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
  //   setPreviewUrl(wig.image);
  //   setError(null);
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWig({ ...wig, [name]: value });
  };

  if (loading) {
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
              <Typography className="text-[#303030] font-bold text-xl">
                Wigs Manage
              </Typography>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit} className="pt-3">
            <Grid container className="pt-3" spacing={3}>
              <Grid item xs={12} md={4}>
                <center>
                  <input
                    accept="image/*"
                    style={{ display: "none", }}
                    id="upload-button"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <img
                    src={previewUrl || wig.image}
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
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid item xs={12}>
                  <Typography className="text-[#303030] font-bold pb-2 text-lg">Title</Typography>
                  <TextField
                    type='text'
                    value={wig.title}
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
                <Grid item xs={12}>
                  <Typography className="text-[#303030] font-bold pb-2 text-lg">Color</Typography>
                  <TextField
                    type='text'
                    value={wig.color}
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
                <Grid item xs={12}>
                  <Typography className="text-[#303030] font-bold pb-2 text-lg">Size</Typography>
                  <TextField
                    type='text'
                    value={wig.size}
                    fullWidth
                    name='size'
                    variant='outlined'
                    className="font-bold rounded pb-3"
                    onChange={handleInputChange}
                    inputProps={{ style: { color: "#303030" } }}
                    sx={{ color: '#303030' }}
                    required
                    focused
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography className="text-[#303030] font-bold pb-2 text-lg">Brand</Typography>
                  <TextField
                    type='text'
                    value={wig.brand}
                    fullWidth
                    name='brand'
                    variant='outlined'
                    className="font-bold rounded pb-3"
                    onChange={handleInputChange}
                    inputProps={{ style: { color: "#303030" } }}
                    sx={{ color: '#303030' }}
                    required
                    focused
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography className="text-[#303030] font-bold pb-2 text-lg">Description</Typography>
                  <TextField
                    type='text'
                    value={wig.desc}
                    fullWidth
                    name='desc'
                    variant='outlined'
                    className="font-bold rounded pb-3"
                    onChange={handleInputChange}
                    inputProps={{ style: { color: "#303030" } }}
                    sx={{ color: '#303030' }}
                    multiline
                    maxRows={5}
                    required
                    focused
                  />
                </Grid>
                <Grid item xs={12}>
                  <Hidden mdDown>
                    <ButtonGroup variant="contained" className="gap-1" sx={{ float: 'right' }} aria-label="contained button group">
                      <Button type='submit' className="bg-[#303030] text-white hover:bg-emerald-600">Update</Button>
                      {/* <Button type='reset' className="bg-[#303030] text-white hover:bg-red-500">Reset</Button> */}
                    </ButtonGroup>
                  </Hidden>
                  <Hidden mdUp>
                    <ButtonGroup variant="contained" className="gap-1 my-2" fullWidth aria-label="contained button group">
                      <Button type='submit' className="bg-[#303030] text-white hover:bg-emerald-600">Update</Button>
                      {/* <Button type='reset' className="bg-[#303030] text-white hover:bg-red-500">Reset</Button> */}
                    </ButtonGroup>
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

export default WigEdit