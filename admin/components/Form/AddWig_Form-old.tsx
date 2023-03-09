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
  IconButton,
  Tooltip,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
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
  const [sizeLength, setSizeLength] = useState('');
  const [sizeCircumference, setSizeCircumference] = useState('');
  const [sizeEarToEar, setSizeEarToEar] = useState('');
  const [sizeFrontToBack, setSizeFrontToBack] = useState('');
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
  const [messageSubImage1, setMessageSubImage1] = useState('');
  const [messageSubImage2, setMessageSubImage2] = useState('');
  const [messageSubImage3, setMessageSubImage3] = useState('');
  const [messageArImage, setMessageArImage] = useState('');

  const [previewMainImage, setPreviewMainImage] = useState<string | null>(null);
  const [previewSubImage1, setPreviewSubImage1] = useState<string | null>(null);
  const [previewSubImage2, setPreviewSubImage2] = useState<string | null>(null);
  const [previewSubImage3, setPreviewSubImage3] = useState<string | null>(null);
  const [previewArImage, setPreviewArImage] = useState<string | null>(null);

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

  useEffect(() => {
    if (!previewSubImage2) {
      return;
    }
    return () => URL.revokeObjectURL(previewSubImage2);
  }, [previewSubImage2]);

  useEffect(() => {
    if (!previewSubImage3) {
      return;
    }
    return () => URL.revokeObjectURL(previewSubImage3);
  }, [previewSubImage3]);

  useEffect(() => {
    if (!previewArImage) {
      return;
    }
    return () => URL.revokeObjectURL(previewArImage);
  }, [previewArImage]);

  const handleMainImageReset = () => {
    setMainImage(null);
    setPreviewMainImage(null);
    setMessageMainImage("");
  };

  const handleSubImage1Reset = () => {
    setSubImage1(null);
    setPreviewSubImage1(null);
    setMessageSubImage1("");
  };

  const handleSubImage2Reset = () => {
    setSubImage2(null);
    setPreviewSubImage2(null);
    setMessageSubImage2("");
  };

  const handleSubImage3Reset = () => {
    setSubImage3(null);
    setPreviewSubImage3(null);
    setMessageSubImage3("");
  };

  const handleArImageReset = () => {
    setArImage(null);
    setPreviewArImage(null);
    setMessageArImage("");
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

  const openSubImage2Dialog = () => {
    if (subImage2InputRef.current) {
      subImage2InputRef.current.click();
    }
  };

  const openSubImage3Dialog = () => {
    if (subImage3InputRef.current) {
      subImage3InputRef.current.click();
    }
  };

  const openArImageDialog = () => {
    if (arImageInputRef.current) {
      arImageInputRef.current.click();
    }
  };

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

  const handleSubImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const subImage2 = e.target.files?.[0];
    if (!subImage2) {
      setSubImage2(null);
      setPreviewSubImage2(null);
      return;
    }

    const isValidType = subImage2.type === "image/jpeg" || subImage2.type === "image/png";
    if (!isValidType) {
      // Show an error message for invalid file type
      setMessageSubImage2("Invalid Image File Type")
      setSubImage2(null);
      setPreviewSubImage2(null);
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(subImage2);
    image.onload = () => {
      if (image.width > 1080 || image.height > 1920) {
        // Show an error message for image size too small
        setMessageSubImage2("File Size less than 1080x1920px")
        setSubImage2(null);
        setPreviewSubImage2(null);
        return;
      }

      URL.revokeObjectURL(image.src);
      setSubImage2(subImage2);
      setPreviewSubImage2(URL.createObjectURL(subImage2));
    };
  };

  const handleSubImage3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const subImage3 = e.target.files?.[0];
    if (!subImage3) {
      setSubImage3(null);
      setPreviewSubImage3(null);
      return;
    }

    const isValidType = subImage3.type === "image/jpeg" || subImage3.type === "image/png";
    if (!isValidType) {
      // Show an error message for invalid file type
      setMessageSubImage3("Invalid Image File Type")
      setSubImage3(null);
      setPreviewSubImage3(null);
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(subImage3);
    image.onload = () => {
      if (image.width > 1080 || image.height > 1920) {
        // Show an error message for image size too small
        setMessageSubImage3("File Size less than 1080x1920px")
        setSubImage3(null);
        setPreviewSubImage3(null);
        return;
      }

      URL.revokeObjectURL(image.src);
      setSubImage3(subImage3);
      setPreviewSubImage3(URL.createObjectURL(subImage3));
    };
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
                  Add Wig
                </Typography>
              )}
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit} onReset={handleReset} className="pt-3">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="px-6 pt-4 pb-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                  <input
                    ref={arImageInputRef}
                    accept="image/*"
                    style={{ display: "none", }}
                    id="upload-button"
                    type="file"
                    // multiple
                    onChange={handleArImageReset}
                  />
                  <Typography className="text-gray-700 font-bold text-center" variant="h5">Wig AR Image</Typography>
                  {previewArImage ? (
                    <center>
                      <img
                        src={previewArImage || ''}
                        className="rounded-lg object-contain h-[400px] w-80 py-2"
                      />
                      <Box className="text-center items-center justify-center flex flex-col">
                        <Tooltip title="Reset Image">
                          <IconButton onClick={handleArImageReset} className='text-gray-400 hover:text-red-400'>
                            <RotateLeftIcon className="w-8 h-8" fontSize='large' />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </center>
                  ) : (
                    <>
                      <Box className="text-center items-center justify-center flex flex-col hover:opacity-70" onClick={openArImageDialog}>
                        {messageArImage ? <Typography className="text-red-500 font-bold py-2" variant="subtitle1">{messageArImage}</Typography> : null}
                        <AddPhotoAlternateOutlinedIcon className="text-gray-400 w-20 h-20" fontSize='large' />
                        <Typography className="text-gray-500 font-bold" variant="subtitle1">Click to upload</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">*Only Vertical Image</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">**Only PNG (Maximum 1080x1920px)</Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
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
                        className="rounded-lg object-contain h-[400px] w-80 py-2"
                      />
                      <Box className="text-center items-center justify-center flex flex-col">
                        <Tooltip title="Reset Image">
                          <IconButton onClick={handleMainImageReset} className='text-gray-400 hover:text-red-400'>
                            <RotateLeftIcon className="w-8 h-8" fontSize='large' />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </center>
                  ) : (
                    <>
                      <Box className="text-center items-center justify-center flex flex-col hover:opacity-70" onClick={openMainImageDialog}>
                        {messageMainImage ? <Typography className="text-red-500 font-bold py-2" variant="subtitle1">{messageMainImage}</Typography> : null}
                        <AddPhotoAlternateOutlinedIcon className="text-gray-400 w-20 h-20" fontSize='large' />
                        <Typography className="text-gray-500 font-bold" variant="subtitle1">Click to upload</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">*Only Vertical Image</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">**PNG or JPG (Maximum 1080x1920px)</Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
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
                        className="rounded-lg object-contain h-[400px] w-80 py-2"
                      />
                      <Box className="text-center items-center justify-center flex flex-col">
                        <Tooltip title="Reset Image">
                          <IconButton onClick={handleSubImage1Reset} className='text-gray-400 hover:text-red-400'>
                            <RotateLeftIcon className="w-8 h-8" fontSize='large' />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </center>
                  ) : (
                    <>
                      <Box className="text-center items-center justify-center flex flex-col hover:opacity-70" onClick={openSubImage1Dialog}>
                        {messageSubImage1 ? <Typography className="text-red-500 font-bold py-2" variant="subtitle1">{messageSubImage1}</Typography> : null}
                        <AddPhotoAlternateOutlinedIcon className="text-gray-400 w-20 h-20" fontSize='large' />
                        <Typography className="text-gray-500 font-bold" variant="subtitle1">Click to upload</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">*Only Vertical Image</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">**PNG or JPG (Maximum 1080x1920px)</Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="px-6 pt-4 pb-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                  <input
                    ref={subImage2InputRef}
                    accept="image/*"
                    style={{ display: "none", }}
                    id="upload-button"
                    type="file"
                    // multiple
                    onChange={handleSubImage2Change}
                  />
                  <Typography className="text-gray-700 font-bold text-center" variant="h5">Sub Image 2</Typography>
                  {previewSubImage2 ? (
                    <center>
                      <img
                        src={previewSubImage2 || ''}
                        className="rounded-lg object-contain h-[400px] w-80 py-2"
                      />
                      <Box className="text-center items-center justify-center flex flex-col">
                        <Tooltip title="Reset Image">
                          <IconButton onClick={handleSubImage2Reset} className='text-gray-400 hover:text-red-400'>
                            <RotateLeftIcon className="w-8 h-8" fontSize='large' />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </center>
                  ) : (
                    <>
                      <Box className="text-center items-center justify-center flex flex-col hover:opacity-70" onClick={openSubImage2Dialog}>
                        {messageSubImage2 ? <Typography className="text-red-500 font-bold py-2" variant="subtitle1">{messageSubImage2}</Typography> : null}
                        <AddPhotoAlternateOutlinedIcon className="text-gray-400 w-20 h-20" fontSize='large' />
                        <Typography className="text-gray-500 font-bold" variant="subtitle1">Click to upload</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">*Only Vertical Image</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">**PNG or JPG (Maximum 1080x1920px)</Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="px-6 pt-4 pb-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                  <input
                    ref={subImage3InputRef}
                    accept="image/*"
                    style={{ display: "none", }}
                    id="upload-button"
                    type="file"
                    // multiple
                    onChange={handleSubImage3Change}
                  />
                  <Typography className="text-gray-700 font-bold text-center" variant="h5">Sub Image 3</Typography>
                  {previewSubImage3 ? (
                    <center>
                      <img
                        src={previewSubImage3 || ''}
                        className="rounded-lg object-contain h-[400px] w-80 py-2"
                      />
                      <Box className="text-center items-center justify-center flex flex-col">
                        <Tooltip title="Reset Image">
                          <IconButton onClick={handleSubImage3Reset} className='text-gray-400 hover:text-red-400'>
                            <RotateLeftIcon className="w-8 h-8" fontSize='large' />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </center>
                  ) : (
                    <>
                      <Box className="text-center items-center justify-center flex flex-col hover:opacity-70" onClick={openSubImage3Dialog}>
                        {messageSubImage3 ? <Typography className="text-red-500 font-bold py-2" variant="subtitle1">{messageSubImage3}</Typography> : null}
                        <AddPhotoAlternateOutlinedIcon className="text-gray-400 w-20 h-20" fontSize='large' />
                        <Typography className="text-gray-500 font-bold" variant="subtitle1">Click to upload</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">*Only Vertical Image</Typography>
                        <Typography className="text-amber-500" variant="subtitle2">**PNG or JPG (Maximum 1080x1920px)</Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={1} className="flex items-center justify-center py-2">
              <Grid item xs={12} sm={6} md={4}>
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                  <>
                    <Typography className="text-[#303030] font-bold pb-2 text-lg">Title</Typography><TextField
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
                    // focused 
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                  <>
                    <Typography className="text-[#303030] font-bold pb-2 text-lg">Style</Typography><TextField
                      type='text'
                      value={style}
                      fullWidth
                      name='style'
                      variant='outlined'
                      className="font-bold rounded pb-3"
                      onChange={(e) => setStyle(e.target.value)}
                      onKeyDown={handleKeyPress}
                      inputProps={{ style: { color: "#303030" } }}
                      sx={{ color: '#303030' }}
                      required
                    // focused 
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                  <>
                    <Typography className="text-[#303030] font-bold pb-2 text-lg">Type</Typography><TextField
                      type='text'
                      value={type}
                      fullWidth
                      name='type'
                      variant='outlined'
                      className="font-bold rounded pb-3"
                      onChange={(e) => setType(e.target.value)}
                      onKeyDown={handleKeyPress}
                      inputProps={{ style: { color: "#303030" } }}
                      sx={{ color: '#303030' }}
                      required
                    // focused 
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                  <>
                    <Typography className="text-[#303030] font-bold pb-2 text-lg">Color</Typography><TextField
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
                    // focused 
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                  <>
                    <Typography className="text-[#303030] font-bold pb-2 text-lg">Size (Inch)</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          label="Length"
                          color="primary"
                          type='number'
                          value={sizeLength}
                          fullWidth
                          name='sizeLength'
                          variant='outlined'
                          className="font-bold rounded pb-3"
                          onChange={(e) => {
                            const parsedValue = parseFloat(e.target.value);
                            if (!isNaN(parsedValue) && parsedValue >= 0) {
                              setSizeLength(parsedValue.toString());
                            }
                          }}
                          onKeyDown={handleKeyPress}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          label="Circumference"
                          color="primary"
                          type='number'
                          value={sizeCircumference}
                          fullWidth
                          name='sizeCircumference'
                          variant='outlined'
                          className="font-bold rounded pb-3"
                          onChange={(e) => {
                            const parsedValue = parseFloat(e.target.value);
                            if (!isNaN(parsedValue) && parsedValue >= 0) {
                              setSizeCircumference(parsedValue.toString());
                            }
                          }}
                          onKeyDown={handleKeyPress}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          label="Ear to Ear"
                          color="primary"
                          type='number'
                          value={sizeEarToEar}
                          fullWidth
                          name='sizeEarToEar'
                          variant='outlined'
                          className="font-bold rounded pb-3"
                          onChange={(e) => {
                            const parsedValue = parseFloat(e.target.value);
                            if (!isNaN(parsedValue) && parsedValue >= 0) {
                              setSizeEarToEar(parsedValue.toString());
                            }
                          }}
                          onKeyDown={handleKeyPress}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          label="Front to Back"
                          color="primary"
                          type='number'
                          value={sizeFrontToBack}
                          fullWidth
                          name='sizeFrontToBack'
                          variant='outlined'
                          className="font-bold rounded pb-3"
                          onChange={(e) => {
                            const parsedValue = parseFloat(e.target.value);
                            if (!isNaN(parsedValue) && parsedValue >= 0) {
                              setSizeFrontToBack(parsedValue.toString());
                            }
                          }}
                          onKeyDown={handleKeyPress}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                  <>
                    <Typography className="text-[#303030] font-bold pb-2 text-lg">Price (฿)</Typography>
                    <TextField
                      type='number'
                      value={price}
                      fullWidth
                      name='price'
                      variant='outlined'
                      className="font-bold rounded pb-3"
                      onChange={(e) => {
                        const parsedValue = parseFloat(e.target.value);
                        if (!isNaN(parsedValue) && parsedValue >= 0) {
                          setPrice(parsedValue.toString());
                        }
                      }}
                      onKeyDown={handleKeyPress}
                      inputProps={{ style: { color: "#303030" } }}
                      sx={{ color: '#303030' }}
                      required
                    // focused
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={12}>
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                  <>
                    <Typography className="text-[#303030] font-bold pb-2 text-lg">Description</Typography><TextField
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
                      maxRows={10}
                      required
                    // focused 
                    />
                  </>
                )}
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={1}>

            </Grid>
          </form>
        </Box>
      </Box>
    </ThemeProvider>

  )
}

export default AddWig_Form