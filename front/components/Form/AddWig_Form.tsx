
import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  Skeleton,
  IconButton,
  Tooltip,
} from "@mui/material";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

import DrawerBar from '../Navigation/DrawerBar';

const drawerWidth = 240;

const AddWig_Form = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, [loading]);

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [subImage1, setSubImage1] = useState<File | null>(null);
  const [arImage, setArImage] = useState<File | null>(null);

  const [previewMainImage, setPreviewMainImage] = useState<string | null>(null);
  const [previewSubImage1, setPreviewSubImage1] = useState<string | null>(null);
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
    if (!previewArImage) {
      return;
    }
    return () => URL.revokeObjectURL(previewArImage);
  }, [previewArImage]);

  const handleMainImageReset = () => {
    setMainImage(null);
    setPreviewMainImage(null);
  };

  const handleSubImage1Reset = () => {
    setSubImage1(null);
    setPreviewSubImage1(null);
  };

  const handleArImageReset = () => {
    setArImage(null);
    setPreviewArImage(null);
  };

  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const subImage1InputRef = useRef<HTMLInputElement>(null);
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
      setMainImage(null);
      setPreviewMainImage(null);
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(mainImage);
    image.onload = () => {
      if (image.width > 1080 || image.height > 1920) {
        // Show an error message for image size too small
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
      setSubImage1(null);
      setPreviewSubImage1(null);
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(subImage1);
    image.onload = () => {
      if (image.width > 1080 || image.height > 1920) {
        // Show an error message for image size too small
        setSubImage1(null);
        setPreviewSubImage1(null);
        return;
      }

      URL.revokeObjectURL(image.src);
      setSubImage1(subImage1);
      setPreviewSubImage1(URL.createObjectURL(subImage1));
    };
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

  }

  return (
    <div>
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
          <form onSubmit={handleSubmit} className="pt-3">
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

                    </>
                  )}
                </Box>
              </Grid>

            </Grid>


          </form>
        </Box>
      </Box>
    </div>

  )
}

export default AddWig_Form