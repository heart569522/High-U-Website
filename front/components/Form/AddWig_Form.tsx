import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
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
  Skeleton,
  IconButton
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

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
  const [subImage1, setSubImage1] = useState<File | null>(null);
  const [subImage2, setSubImage2] = useState<File | null>(null);
  const [subImage3, setSubImage3] = useState<File | null>(null);
  const [arImage, setArImage] = useState<File | null>(null);

  const [messageMainImage, setMessageMainImage] = useState('');
  const [previewMainImage, setPreviewMainImage] = useState<string | null>(null);

  const [messageSubImage1, setMessageSubImage1] = useState('');
  const [previewSubImage1, setPreviewSubImage1] = useState<string | null>(null);

  useEffect(() => {
    if (!previewMainImage) {
      return;
    }
    return () => URL.revokeObjectURL(previewMainImage);
  }, [previewMainImage]);

  useEffect(() => {
    if (!previewSubImage1) {
      return;
    }
    return () => URL.revokeObjectURL(previewSubImage1);
  }, [previewSubImage1]);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mainImage = e.target.files?.[0];
    if (!mainImage) {
      setMainImage(null);
      setPreviewMainImage(null);
      return;
    }

    const isValidType = mainImage.type === "image/jpeg" || mainImage.type === "image/png";
    if (!isValidType) {
      // Show an error message for invalid file type
      setMessageMainImage("Invalid Image File Type")
      setMainImage(null);
      setPreviewMainImage(null);
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(mainImage);
    image.onload = () => {
      if (image.width > 1080 || image.height > 1920) {
        // Show an error message for image size too small
        setMessageMainImage("File Size less than 1080x1920px")
        setMainImage(null);
        setPreviewMainImage(null);
        return;
      }

      URL.revokeObjectURL(image.src);
      setMainImage(mainImage);
      setPreviewMainImage(URL.createObjectURL(mainImage));
    };
  };

  const handleSubImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const subImage1 = e.target.files?.[0];
    if (!subImage1) {
      setSubImage1(null);
      setPreviewSubImage1(null);
      return;
    }

    const isValidType = subImage1.type === "image/jpeg" || subImage1.type === "image/png";
    if (!isValidType) {
      // Show an error message for invalid file type
      setMessageSubImage1("Invalid Image File Type")
      setSubImage1(null);
      setPreviewSubImage1(null);
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(subImage1);
    image.onload = () => {
      if (image.width > 1080 || image.height > 1920) {
        // Show an error message for image size too small
        setMessageSubImage1("File Size less than 1080x1920px")
        setSubImage1(null);
        setPreviewSubImage1(null);
        return;
      }

      URL.revokeObjectURL(image.src);
      setSubImage1(subImage1);
      setPreviewSubImage1(URL.createObjectURL(subImage1));
    };
  };

  const handleMainImageReset = () => {
    // setMainImage(null);
    setPreviewMainImage(null);
    setMessageMainImage("");
  };

  const handleSubImage1Reset = () => {
    // setSubImage1(null);
    setPreviewSubImage1(null);
    setMessageSubImage1("");
  };

  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const subImage1InputRef = useRef<HTMLInputElement>(null);
  const subImage2InputRef = useRef<HTMLInputElement>(null);
  const subImage3InputRef = useRef<HTMLInputElement>(null);
  const arImageInputRef = useRef<HTMLInputElement>(null);

  const openMainImageDialog = () => {
    if (mainImageInputRef.current) {
      mainImageInputRef.current.click();
    }
  };

  const openSubImage1Dialog = () => {
    if (subImage1InputRef.current) {
      subImage1InputRef.current.click();
    }
  };

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
    setPreviewMainImage(null);
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
            <Grid container spacing={1}>
              <Grid item xs={12} md={3}>
                <Box className="px-6 pt-4 pb-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                  <input
                    ref={mainImageInputRef}
                    accept="image/*"
                    style={{ display: "none", }}
                    id="upload-button"
                    type="file"
                    // multiple
                    onChange={handleMainImageChange}
                  />
                  <Typography className="text-gray-700 font-bold text-center" variant="h5">Main Image</Typography>
                  {previewMainImage ? (
                    <center>
                      <img
                        src={previewMainImage || ''}
                        className="rounded-lg object-top object-cover h-auto w-80 py-2"
                      />
                      <Box className="text-center items-center justify-center flex flex-col">
                        <IconButton onClick={handleMainImageReset} className='text-gray-400 hover:text-red-400'>
                          <RotateLeftIcon className="w-8 h-8" fontSize='large' />
                        </IconButton>
                      </Box>
                    </center>
                  ) : (
                    <>
                      <Box className="text-center items-center justify-center flex flex-col hover:opacity-70" onClick={openMainImageDialog}>
                        {messageMainImage ? <Typography className="text-red-500 font-bold py-2" variant="subtitle1">{messageMainImage}</Typography> : null}
                        <CloudUploadIcon className="text-gray-400 w-20 h-20" fontSize='large' />
                        <Typography className="text-gray-500 font-bold" variant="subtitle1">Click to upload</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">*Only Vertical Image</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">**PNG or JPG (Maximum 1080x1920px)</Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box className="px-6 pt-4 pb-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                  <input
                    ref={subImage1InputRef}
                    accept="image/*"
                    style={{ display: "none", }}
                    id="upload-button"
                    type="file"
                    // multiple
                    onChange={handleSubImage1Change}
                  />
                  <Typography className="text-gray-700 font-bold text-center" variant="h5">Sub Image 1</Typography>
                  {previewSubImage1 ? (
                    <center>
                      <img
                        src={previewSubImage1 || ''}
                        className="rounded-lg object-top object-cover h-auto w-80 py-2"
                      />
                      <Box className="text-center items-center justify-center flex flex-col">
                        <IconButton onClick={handleSubImage1Reset} className='text-gray-400 hover:text-red-400'>
                          <RotateLeftIcon className="w-8 h-8" fontSize='large' />
                        </IconButton>
                      </Box>
                    </center>
                  ) : (
                    <>
                      <Box className="text-center items-center justify-center flex flex-col hover:opacity-70" onClick={openSubImage1Dialog}>
                        {messageSubImage1 ? <Typography className="text-red-500 font-bold py-2" variant="subtitle1">{messageSubImage1}</Typography> : null}
                        <CloudUploadIcon className="text-gray-400 w-20 h-20" fontSize='large' />
                        <Typography className="text-gray-500 font-bold" variant="subtitle1">Click to upload</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">*Only Vertical Image</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">**PNG or JPG (Maximum 1080x1920px)</Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </ThemeProvider>

  )
}

export default AddWig_Form