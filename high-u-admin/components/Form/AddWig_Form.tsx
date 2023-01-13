import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import { getWig, updateWig } from '../api/wigApi'
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

const AddWig_Form = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter()

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [brand, setBrand] = useState('');

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
          <form className="pt-3">
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
                    src={previewUrl || ''}
                    className="w-full h-full max-w-[400px] rounded-lg"
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
                    value={title}
                    fullWidth
                    name='title'
                    variant='outlined'
                    className="font-bold rounded pb-3"
                    // onChange={handleInputChange}
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
                    value={color}
                    fullWidth
                    name='color'
                    variant='outlined'
                    className="font-bold rounded pb-3"
                    // onChange={handleInputChange}
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
                    value={size}
                    fullWidth
                    name='size'
                    variant='outlined'
                    className="font-bold rounded pb-3"
                    // onChange={handleInputChange}
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
                    value={brand}
                    fullWidth
                    name='brand'
                    variant='outlined'
                    className="font-bold rounded pb-3"
                    // onChange={handleInputChange}
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
                    value={desc}
                    fullWidth
                    name='desc'
                    variant='outlined'
                    className="font-bold rounded pb-3"
                    // onChange={handleInputChange}
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
                      <Button type='submit' className="bg-[#303030] text-white hover:bg-emerald-600">OK</Button>
                      <Button type='reset' className="bg-[#303030] text-white hover:bg-red-500">Delete</Button>
                    </ButtonGroup>
                  </Hidden>
                  <Hidden mdUp>
                    <ButtonGroup variant="contained" className="gap-1 my-2" fullWidth aria-label="contained button group">
                      <Button type='submit' className="bg-[#303030] text-white hover:bg-emerald-600">OK</Button>
                      <Button type='reset' className="bg-[#303030] text-white hover:bg-red-500">Reset</Button>
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

export default AddWig_Form