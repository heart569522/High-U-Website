import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { storage } from '../../pages/api/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
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
  Link,
  Skeleton
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import DrawerBar from '../Navigation/DrawerBar';

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

const AddWig_Form = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, [loading]);

  const [openAlert, setOpenAlert] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()

  const [title, setTitle] = useState('');
  const [style, setStyle] = useState('');
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');

  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState<string | null>(null)
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const defaultImageUrl = 'https://i.pinimg.com/736x/85/6c/0c/856c0c237eec555ec901c7fd4a275ae3.jpg';

  useEffect(() => {
    if (!previewUrl) {
      return;
    }
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mainImage = e.target.files?.[0];
    if (!mainImage) {
      setMainImage(null);
      setPreviewUrl(null);
      return;
    }
    setMainImage(e.target.files ? e.target.files[0] : null);
    setPreviewUrl(URL.createObjectURL(mainImage));
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
  }

  const handleReset = () => {
    setTitle("");
    setDesc("");
    setColor("");
    setPrice("");
    setSize("");
    setMainImage(null);
    setPreviewUrl(null);
    setError("");
  };

  return (
    <ThemeProvider theme={theme}>
      <DrawerBar />
      <Box
        component="main"
        className="p-5 ml-[240px] max-[899px]:ml-0"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box className="bg-white w-full h-full rounded-xl pt-5 pb-5 px-5 shadow-md max-[899px]:pb-3">
          <Grid container>
            <Grid item xs={12}>
              {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-5xl rounded-md" />) : (
                <Typography className="text-[#303030] font-bold text-xl">
                  Create Wig
                </Typography>
              )}
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit} onReset={handleReset} className="pt-3">
            <Grid container className="pt-3" spacing={3}>
              <Grid item xs={12} md={4}>
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-72 rounded-md" />) : (
                  <center>
                    <input
                      accept="image/*"
                      style={{ display: "none", }}
                      id="upload-button"
                      type="file"
                      onChange={handleMainImageChange}
                    />
                    <img
                      src={previewUrl || defaultImageUrl}
                      className="rounded-lg object-top object-cover h-auto w-96"
                    />
                    <label htmlFor="upload-button">
                      <Button
                        variant='contained'
                        className="bg-[#F0CA83] text-[#303030] font-bold mb-2 hover:bg-[#f3b94d] mt-3"
                        component="span"
                        startIcon={<AddAPhotoIcon />}
                      >
                        Add Image
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
                      value={title}
                      fullWidth
                      name='title'
                      variant='outlined'
                      className="font-bold rounded pb-3"
                      onChange={(e) => setTitle(e.target.value)}
                      onKeyDown={handleKeyPress}
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
                      value={color}
                      fullWidth
                      name='color'
                      variant='outlined'
                      className="font-bold rounded pb-3"
                      onChange={(e) => setColor(e.target.value)}
                      onKeyDown={handleKeyPress}
                      inputProps={{ style: { color: "#303030" } }}
                      sx={{ color: '#303030' }}
                      required
                      focused
                    />
                  </Grid>
                )}
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                  <Grid item xs={12}>
                    <Typography className="text-[#303030] font-bold pb-2 text-lg">Size</Typography>
                    <TextField
                      type='text'
                      value={size}
                      fullWidth
                      name='size'
                      variant='outlined'
                      className="font-bold rounded pb-3"
                      onChange={(e) => setSize(e.target.value)}
                      onKeyDown={handleKeyPress}
                      inputProps={{ style: { color: "#303030" } }}
                      sx={{ color: '#303030' }}
                      required
                      focused
                    />
                  </Grid>
                )}
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                  <Grid item xs={12}>
                    <Typography className="text-[#303030] font-bold pb-2 text-lg">Price</Typography>
                    <TextField
                      type='text'
                      value={price}
                      fullWidth
                      name='price'
                      variant='outlined'
                      className="font-bold rounded pb-3"
                      onChange={(e) => setPrice(e.target.value)}
                      onKeyDown={handleKeyPress}
                      inputProps={{ style: { color: "#303030" } }}
                      sx={{ color: '#303030' }}
                      required
                      focused
                    />
                  </Grid>
                )}
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                  <Grid item xs={12}>
                    <Typography className="text-[#303030] font-bold pb-2 text-lg">Description</Typography>
                    <TextField
                      type='text'
                      value={desc}
                      fullWidth
                      name='desc'
                      variant='outlined'
                      className="font-bold rounded pb-3"
                      onChange={(e) => setDesc(e.target.value)}
                      onKeyDown={handleKeyPress}
                      inputProps={{ style: { color: "#303030" } }}
                      sx={{ color: '#303030' }}
                      multiline
                      maxRows={5}
                      required
                      focused
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Hidden mdDown>
                    {loading ? (<Skeleton animation="wave" variant="rectangular" sx={{ float: 'right' }} className="w-1/5 justify-end h-10 my-1 rounded-md" />) : (
                      <ButtonGroup variant="contained" className="gap-1" sx={{ float: 'right' }} aria-label="contained button group">
                        <Button type='submit' className="bg-[#303030] text-white hover:bg-emerald-600">OK</Button>
                        <Button type='reset' className="bg-[#303030] text-white hover:bg-red-500">Reset</Button>
                      </ButtonGroup>
                    )}
                  </Hidden>
                  <Hidden mdUp>
                    {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-10 my-1 rounded-md" />) : (
                      <ButtonGroup variant="contained" className="gap-1 my-3" fullWidth aria-label="contained button group">
                        <Button type='submit' className="bg-[#303030] text-white hover:bg-emerald-600">OK</Button>
                        <Button type='reset' className="bg-[#303030] text-white hover:bg-red-500">Reset</Button>
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

export default AddWig_Form