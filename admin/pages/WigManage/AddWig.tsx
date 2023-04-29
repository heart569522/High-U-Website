import { useRef, useState } from 'react'
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tooltip,
  IconButton,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { storage } from '../../pages/api/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import Head from 'next/head';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

type ImageWig = {
  arImage: File | null;
  mainImage: File | null;
  subImages: (File | undefined | {})[]; // Allow for null values
};

const MAX_SUB_IMAGES = 6;
const INITIAL_SUB_IMAGES_COUNT = 3;
const API_URL = "http://localhost:8000"

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

const AddWig = () => {
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState([0, 0, 0, 0]);
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");

  const handleTypeChange = (event: { target: { value: string; }; }) => {
    setType(event.target.value as string);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const [imageWig, setImageWig] = useState<ImageWig>({
    arImage: null,
    mainImage: null,
    subImages: new Array(INITIAL_SUB_IMAGES_COUNT).fill({}), // initialize with empty objects
  });

  const [arImagePreview, setArImagePreview] = useState<string>('');
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [subImagePreviews, setSubImagePreviews] = useState<string[]>([]);

  const arImageRef = useRef<HTMLInputElement>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const subImageRefs = useRef<(HTMLInputElement | null)[]>(new Array(INITIAL_SUB_IMAGES_COUNT).fill(null));
  const [subImage, setSubImage] = useState<File | undefined>(undefined) // define subImage state variable

  const [messageImage, setMessageImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const handleCloseAlertSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertSuccess(false);
  };

  const handleCloseAlertError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertError(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number | undefined = undefined) => {
    const { name } = e.target;
    console.log('index:', index);

    if (name === 'subImage' && typeof index !== 'undefined') {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const srcRatio = img.width / img.height;
              const destRatio = 525 / 700;
              let cropWidth = img.width;
              let cropHeight = img.height;
              let offsetX = 0;
              let offsetY = 0;

              if (srcRatio > destRatio) {
                cropWidth = img.height * destRatio;
                offsetX = (img.width - cropWidth) / 2;
              } else if (srcRatio < destRatio) {
                cropHeight = img.width / destRatio;
                offsetY = (img.height - cropHeight) / 2;
              }

              canvas.width = 525;
              canvas.height = 700;
              ctx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, 525, 700);
              const updatedSubImagePreviews = [...subImagePreviews];
              updatedSubImagePreviews[index] = canvas.toDataURL();
              console.log('updatedSubImagePreviews:', updatedSubImagePreviews);
              setSubImagePreviews(updatedSubImagePreviews);
            }
          };
          img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    } else if (e.target.files) {
      setImageWig({
        ...imageWig,
        [name]: e.target.files[0],
      });

      const reader = new FileReader();
      reader.onload = () => {
        if (name === 'arImage') {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const srcRatio = img.width / img.height;
              const destRatio = 525 / 700;
              let cropWidth = img.width;
              let cropHeight = img.height;
              let offsetX = 0;
              let offsetY = 0;

              if (srcRatio > destRatio) {
                cropWidth = img.height * destRatio;
                offsetX = (img.width - cropWidth) / 2;
              } else if (srcRatio < destRatio) {
                cropHeight = img.width / destRatio;
                offsetY = (img.height - cropHeight) / 2;
              }

              canvas.width = 525;
              canvas.height = 700;
              ctx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, 525, 700);
              setArImagePreview(canvas.toDataURL());
            }
          };
          img.src = reader.result as string;
        } else if (name === 'mainImage') {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const srcRatio = img.width / img.height;
              const destRatio = 525 / 700;
              let cropWidth = img.width;
              let cropHeight = img.height;
              let offsetX = 0;
              let offsetY = 0;

              if (srcRatio > destRatio) {
                cropWidth = img.height * destRatio;
                offsetX = (img.width - cropWidth) / 2;
              } else if (srcRatio < destRatio) {
                cropHeight = img.width / destRatio;
                offsetY = (img.height - cropHeight) / 2;
              }

              canvas.width = 525;
              canvas.height = 700;
              ctx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, 525, 700);
              setMainImagePreview(canvas.toDataURL());
            }
          };
          img.src = reader.result as string;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const openArImageDialog = () => {
    if (arImageRef.current) {
      arImageRef.current.click();
    }
  };

  const openMainImageDialog = () => {
    if (mainImageRef.current) {
      mainImageRef.current.click();
    }
  };

  const openSubImageDialog = (index: number) => {
    if (subImageRefs.current && subImageRefs.current[index]) {
      subImageRefs.current[index]?.click();
    }
  };

  const handleAddSubImage = () => {
    if (imageWig.subImages.length < MAX_SUB_IMAGES) {
      setImageWig({
        ...imageWig,
        subImages: [...imageWig.subImages, ''], // add an empty object to represent the new sub-image
      });
      setSubImagePreviews([...subImagePreviews, '']); // add an empty string to represent the preview of the new sub-image
    }
  };

  const handleDeleteSubImage = (index: number) => {
    if (imageWig.subImages.length > INITIAL_SUB_IMAGES_COUNT) {
      const updatedSubImages = [...imageWig.subImages];
      updatedSubImages.splice(index, 1); // Remove the sub-image at the specified index

      setImageWig({
        ...imageWig,
        subImages: updatedSubImages, // Update the sub-images array in the state
      });

      const updatedPreviews = [...subImagePreviews];
      updatedPreviews.splice(index, 1); // Remove the preview at the specified index

      setSubImagePreviews(updatedPreviews); // Update the sub-image previews in the state
    }
  };

  const previewImage = (file: File, previewId: string) => {
    const reader = new FileReader();
    const preview = document.getElementById(previewId) as HTMLImageElement;

    reader.onload = () => {
      if (preview) {
        preview.src = reader.result as string;
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleArImageReset = () => {
    setImageWig((prevImageWig) => ({
      ...prevImageWig,
      arImage: null,
    }));
    setArImagePreview('');
  };

  const handleMainImageReset = () => {
    setImageWig((prevImageWig) => ({
      ...prevImageWig,
      mainImage: null,
    }));
    setMainImagePreview('');
  };

  const handleSubImageReset = (index: number) => {
    setImageWig((prevImageWig) => {
      const updatedSubImages: (File | undefined | {})[] = [...prevImageWig.subImages];
      updatedSubImages[index] = undefined; // set to undefined
      return {
        ...prevImageWig,
        subImages: updatedSubImages,
      };
    });
    setSubImage(undefined); // set subImage state to undefined
    setSubImagePreviews((prevSubImagePreviews) => {
      const updatedSubImagePreviews = [...prevSubImagePreviews];
      updatedSubImagePreviews[index] = ''; // set to empty string
      return updatedSubImagePreviews;
    });
  };

  const handleSubImageSelect = (index: number, file: File) => {
    setImageWig((prevImageWig) => {
      const updatedSubImages = [...prevImageWig.subImages];
      updatedSubImages[index] = file; // set to selected file
      return {
        ...prevImageWig,
        subImages: updatedSubImages,
      };
    });

    setSubImagePreviews((prevSubImagePreviews) => {
      const updatedSubImagePreviews = [...prevSubImagePreviews];
      updatedSubImagePreviews[index] = URL.createObjectURL(file); // set to URL of selected file
      return updatedSubImagePreviews;
    });
  };

  const handleResetAll = () => {
    setTitle("");
    setStyle("");
    setType("");
    setColor("");
    setSize([0, 0, 0, 0]);
    setPrice(0);
    setDesc("");
    setImageWig({
      arImage: null,
      mainImage: null,
      subImages: new Array(INITIAL_SUB_IMAGES_COUNT).fill({}),
    });
    setArImagePreview("");
    setMainImagePreview("");
    setSubImagePreviews(new Array(INITIAL_SUB_IMAGES_COUNT).fill(""));
  };

  const resizeAndCropImage = (imageFile: File, fileName: string, type: 'main' | 'sub', width = 525, height = 700): Promise<File> => {
    if (type === 'main' || type === 'sub') {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = (event) => {
          const image = new Image();
          image.src = event.target?.result as string;
          image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const aspectRatio = image.width / image.height;
              let newWidth = width;
              let newHeight = height;
              if (aspectRatio > width / height) {
                // Image is wider than the target aspect ratio, so reduce its width
                newWidth = Math.round(height * aspectRatio);
              } else {
                // Image is taller than the target aspect ratio, so reduce its height
                newHeight = Math.round(width / aspectRatio);
              }
              canvas.width = newWidth;
              canvas.height = newHeight;
              ctx.drawImage(image, 0, 0, newWidth, newHeight);
              const croppedCanvas = document.createElement('canvas');
              const croppedCtx = croppedCanvas.getContext('2d');
              if (croppedCtx) {
                const x = (newWidth - width) / 2;
                const y = (newHeight - height) / 2;
                croppedCanvas.width = width;
                croppedCanvas.height = height;
                croppedCtx.drawImage(canvas, x, y, width, height, 0, 0, width, height);
                croppedCanvas.toBlob((blob) => {
                  if (blob) {
                    const typeParts = blob.type.split('/');
                    const fileType = typeParts[1];
                    const customType = `${fileType};name=${fileName}`;
                    const customBlob = new Blob([blob], { type: 'image/png' });
                    resolve(new File([customBlob], fileName));
                  } else {
                    reject(new Error('Failed to convert canvas to blob'));
                  }
                }, 'image/png', 1);
              } else {
                reject(new Error('Failed to get canvas context'));
              }
            } else {
              reject(new Error('Failed to get canvas context'));
            }
          };
          image.onerror = (error) => {
            reject(error);
          };
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    } else {
      return Promise.reject(new Error('Invalid image type'));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAlertSuccess(false);
    setUploading(true);
    e.preventDefault();

    try {
      if (!imageWig.arImage) {
        throw new Error('File is required')
      }

      if (!imageWig.mainImage) {
        throw new Error('File is required')
      }

      const mainImageCrop = await resizeAndCropImage(imageWig.mainImage, 'mainImage.png', 'main');
      const subImageCrops = await Promise.all(
        imageWig.subImages.map((subImage, index) => {
          if (!(subImage instanceof File)) {
            throw new Error(`Invalid file object at index ${index + 1}`);
          }
          return resizeAndCropImage(subImage, `subImage.png`, 'sub');
        })
      );


      const arImageName = imageWig.arImage.name;
      const mainImageName = mainImageCrop.name;
      const subImageNames = (subImageCrops as File[]).map((subImage) => subImage.name);

      const arImageRef = ref(
        storage,
        `wig_images/${title}/${'AR_Image'}`
      );
      const mainImageRef = ref(
        storage,
        `wig_images/${title}/${'MAIN_Image'}`
      );
      const subImageRefs = subImageNames.map((name, i) =>
        ref(storage, `wig_images/${title}/sub_images/${'SUB_Image_' + i}`)
      );

      const arUploadTask = uploadBytesResumable(
        arImageRef,
        imageWig.arImage
      );
      const mainUploadTask = uploadBytesResumable(mainImageRef, mainImageCrop, {
        contentType: 'image/png'
      });
      const subUploadTasks = subImageCrops.map((subImage, index) => {
        if (!(subImage instanceof File)) {
          throw new Error(`Invalid file object at index ${index}`);
        }
        return uploadBytesResumable(subImageRefs[index], subImage, {
          contentType: 'image/png'
        });
      });
      // Wait for all images to finish uploading
      const [arSnapshot, mainSnapshot, ...subSnapshots] = await Promise.all([
        arUploadTask,
        mainUploadTask,
        ...subUploadTasks,
      ]);

      const arImageUrl = await getDownloadURL(arSnapshot.ref);
      const mainImageUrl = await getDownloadURL(mainSnapshot.ref);
      const subImageUrls = await Promise.all(
        subSnapshots.map((snapshot) => getDownloadURL(snapshot.ref))
      );

      // Add wig data to database
      const response = await fetch(`${API_URL}/api/wig/addWig`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          style,
          type,
          color,
          size,
          price,
          desc,
          arImage: arImageUrl,
          mainImage: mainImageUrl,
          subImages: subImageUrls,
        }),
      });
      console.log(response);
      handleResetAll();
      setAlertSuccess(true);

      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error(error);
      setAlertError(true)
    } finally {
      setUploading(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Head><title>Create Wig | High U Administrator</title></Head>
      <Box
        component="main"
        className="p-5 ml-[240px] max-[899px]:ml-0"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box className="bg-white w-full h-full rounded-xl pt-5 pb-5 px-5 shadow-md max-[899px]:pb-3">
          <Grid container>
            <Grid item xs={12}>
              <Typography className="text-[#303030] font-bold text-xl">
                Create&nbsp;Wig
              </Typography>
            </Grid>
          </Grid>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={uploading}
          >
            <CircularProgress color="inherit" />
            <Typography>&nbsp;Creating...</Typography>
          </Backdrop>
          <Snackbar open={alertSuccess} autoHideDuration={5000} onClose={handleCloseAlertSuccess}>
            <Alert onClose={handleCloseAlertSuccess} severity="success" sx={{ width: '100%' }}>
              Create New Wig Successfully!
            </Alert>
          </Snackbar>
          <Snackbar open={alertError} autoHideDuration={5000} onClose={handleCloseAlertError}>
            <Alert onClose={handleCloseAlertError} severity="error" sx={{ width: '100%' }}>
              Create New Wig Error!
            </Alert>
          </Snackbar>
          <form onSubmit={handleSubmit} onReset={handleResetAll}>
            <Grid container spacing={1} className="flex items-center justify-start py-6">
              <Grid item xs={12} sm={6} md={3}>
                <Box className="px-6 pt-4 pb-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                  <input
                    ref={arImageRef}
                    type="file"
                    name="arImage"
                    accept="image/png"
                    style={{ display: "none", }}
                    onChange={(e) => {
                      handleInputChange(e);
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        previewImage(file, "arImagePreview");
                      }
                    }}
                  />
                  <Typography className="text-gray-700 font-bold text-center" variant="h5">Wig AR Image</Typography>
                  {imageWig.arImage ? (
                    <center>
                      <picture>
                        <img
                          src={arImagePreview}
                          alt="AR Image Preview"
                          className="rounded-lg object-contain h-[300px] w-52 py-2"
                        />
                      </picture>
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
                        {messageImage ? <Typography className="text-red-500 font-bold py-2" variant="subtitle1">{messageImage}</Typography> : null}
                        <AddPhotoAlternateOutlinedIcon className="text-gray-400 w-20 h-20" fontSize='large' />
                        <Typography className="text-gray-500 font-bold" variant="subtitle1">Click to upload</Typography>
                        <Box className="pt-3">
                          <Typography className="text-amber-500" variant="subtitle2">*Only Vertical Image</Typography>
                          <Typography className="text-amber-500" variant="subtitle2">**Only .PNG File</Typography>
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="px-6 pt-4 pb-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                  <input
                    ref={mainImageRef}
                    type="file"
                    name="mainImage"
                    accept="image/*"
                    style={{ display: "none", }}
                    onChange={(e) => {
                      handleInputChange(e);
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        previewImage(file, "mainImagePreview");
                      }
                    }}
                  />
                  <Typography className="text-gray-700 font-bold text-center" variant="h5">Wig Main Image</Typography>
                  {imageWig.mainImage ? (
                    <center>
                      <picture>
                        <img
                          src={mainImagePreview}
                          alt="Main Image Preview"
                          className="rounded-lg object-contain h-[300px] w-52 py-2"
                        />
                      </picture>
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
                        {messageImage ? <Typography className="text-red-500 font-bold py-2" variant="subtitle1">{messageImage}</Typography> : null}
                        <AddPhotoAlternateOutlinedIcon className="text-gray-400 w-20 h-20" fontSize='large' />
                        <Typography className="text-gray-500 font-bold" variant="subtitle1">Click to upload</Typography>
                        <Box className="pt-3">
                          <Typography className="text-amber-500" variant="subtitle2">*Only Vertical Image</Typography>
                          <Typography className="text-amber-500" variant="subtitle2">&nbsp;</Typography>
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
              {imageWig.subImages.map((subImage, index) => (
                <Grid item xs={12} sm={6} md={3} key={index} className='relative'>
                  <Box className="px-6 pt-4 pb-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                    <input
                      ref={(ref) => (subImageRefs.current[index] = ref)}
                      type="file"
                      name={`subImage${index + 1}`}
                      accept="image/*"
                      style={{ display: "none", }}
                      onChange={(e) => {
                        handleInputChange(e);
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          // Add sub-image
                          handleSubImageSelect(index, file); // Call the handleSubImageSelect function to update state for sub-image
                          previewImage(file, `subImagePreview-${index}`);
                        } else {
                          // Reset sub-image
                          handleSubImageReset(index); // Call the handleSubImageReset function to update state for sub-image
                        }
                      }}
                    />
                    <Typography className="text-gray-700 font-bold text-center" variant="h5">Sub Image {index + 1}</Typography>
                    {subImage && subImagePreviews[index] ? (
                      <center>
                        <picture>
                          <img
                            src={subImagePreviews[index]}
                            alt={`Sub Image ${index + 1} Preview`}
                            className="rounded-lg object-contain h-[300px] w-52 py-2"
                          />
                        </picture>
                        <Box className="text-center items-center justify-center flex flex-col">
                          <Tooltip title="Reset Image">
                            <IconButton onClick={() => handleSubImageReset(index)} className='text-gray-400 hover:text-red-400'>
                              <RotateLeftIcon className="w-8 h-8" fontSize='large' />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </center>
                    ) : (
                      <>
                        <Box className="text-center items-center justify-center flex flex-col hover:opacity-70" onClick={() => openSubImageDialog(index)}>
                          {messageImage ? <Typography className="text-red-500 font-bold py-2" variant="subtitle1">{messageImage}</Typography> : null}
                          <AddPhotoAlternateOutlinedIcon className="text-gray-400 w-20 h-20" fontSize='large' />
                          <Typography className="text-gray-500 font-bold" variant="subtitle1">Click to upload</Typography>
                          <Box className="pt-3">
                            <Typography className="text-amber-500" variant="subtitle2">*Only Vertical Image</Typography>
                            <Typography className="text-amber-500" variant="subtitle2">&nbsp;</Typography>
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                  {/* Conditionally render delete button */}
                  {imageWig.subImages.length > INITIAL_SUB_IMAGES_COUNT && (
                    <Tooltip title="Remove Sub Image">
                      <IconButton
                        onClick={() => handleDeleteSubImage(index)}
                        className="text-red-400 absolute -top-1 -right-3"
                        style={{ zIndex: 1 }}
                      >
                        <RemoveCircleSharpIcon className="w-8 h-8" fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={3} className='flex justify-center items-center'>
                {imageWig.subImages.length < MAX_SUB_IMAGES && (
                  <Tooltip title="Add Sub Image (Max 6)">
                    <IconButton onClick={handleAddSubImage} className='text-gray-400'>
                      <AddCircleIcon className="w-20 h-20 max-[599px]:w-12 max-[599px]:h-12" fontSize='large' />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={1} className="flex items-center justify-center py-2">
              <Grid item xs={12} sm={6} md={4}>
                <Typography className="text-[#303030] font-bold pb-2 text-lg">Title</Typography>
                <TextField
                  type='text'
                  value={title}
                  fullWidth
                  name='title'
                  variant='outlined'
                  className="font-bold rounded pb-3"
                  onChange={(e) => setTitle(e.target.value)}
                  inputProps={{ style: { color: "#303030" } }}
                  sx={{ color: '#303030' }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography className="text-[#303030] font-bold pb-2 text-lg">Style</Typography>
                <TextField
                  type='text'
                  value={style}
                  fullWidth
                  name='style'
                  variant='outlined'
                  className="font-bold rounded pb-3"
                  onChange={(e) => setStyle(e.target.value)}
                  inputProps={{ style: { color: "#303030" } }}
                  sx={{ color: '#303030' }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography className="text-[#303030] font-bold pb-2 text-lg">Type</Typography>
                <FormControl fullWidth className='pb-3'>
                  <InputLabel id="demo-simple-select-label">Select...</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="type"
                    onChange={handleTypeChange}
                    required
                  >
                    <MenuItem value='Synthetic'>Synthetic</MenuItem>
                    <MenuItem value='Human&nbsp;Hair'>Human&nbsp;Hair</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography className="text-[#303030] font-bold pb-2 text-lg">Color</Typography>
                <TextField
                  type='text'
                  value={color}
                  fullWidth
                  name='color'
                  variant='outlined'
                  className="font-bold rounded pb-3"
                  onChange={(e) => setColor(e.target.value)}
                  inputProps={{ style: { color: "#303030" } }}
                  sx={{ color: '#303030' }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography className="text-[#303030] font-bold pb-2 text-lg">Size (Inch)</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Length"
                      color="primary"
                      type="number"
                      value={size[0]}
                      fullWidth
                      name="sizeLength"
                      variant="outlined"
                      className="font-bold rounded pb-3"
                      onChange={(e) => {
                        const parsedValue = parseInt(e.target.value);
                        if (!isNaN(parsedValue) && parsedValue >= 0) {
                          setSize([parsedValue, size[1], size[2], size[3]]);
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
                      type="number"
                      value={size[1]}
                      fullWidth
                      name="sizeCircumference"
                      variant="outlined"
                      className="font-bold rounded pb-3"
                      onChange={(e) => {
                        const parsedValue = parseInt(e.target.value);
                        if (!isNaN(parsedValue) && parsedValue >= 0) {
                          setSize([size[0], parsedValue, size[2], size[3]]);
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
                      type="number"
                      value={size[2]}
                      fullWidth
                      name="sizeEarToEar"
                      variant="outlined"
                      className="font-bold rounded pb-3"
                      onChange={(e) => {
                        const parsedValue = parseInt(e.target.value);
                        if (!isNaN(parsedValue) && parsedValue >= 0) {
                          setSize([size[0], size[1], parsedValue, size[3]]);
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
                      type="number"
                      value={size[3]}
                      fullWidth
                      name="sizeFrontToBack"
                      variant="outlined"
                      className="font-bold rounded pb-3"
                      onChange={(e) => {
                        const parsedValue = parseInt(e.target.value);
                        if (!isNaN(parsedValue) && parsedValue >= 0) {
                          setSize([size[0], size[1], size[2], parsedValue]);
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
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography className="text-[#303030] font-bold pb-2 text-lg">Price (฿)</Typography>
                <TextField
                  type='number'
                  value={price}
                  fullWidth
                  name='price'
                  variant='outlined'
                  className="font-bold rounded pb-3"
                  onChange={(e) => {
                    const parsedValue = parseInt(e.target.value);
                    if (!isNaN(parsedValue) && parsedValue >= 0) {
                      setPrice(parsedValue);
                    }
                  }}
                  onKeyDown={handleKeyPress}
                  inputProps={{ style: { color: "#303030" } }}
                  sx={{ color: '#303030' }}
                  required
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
                  onChange={(e) => setDesc(e.target.value)}
                  inputProps={{ style: { color: "#303030" } }}
                  sx={{ color: '#303030' }}
                  multiline
                  maxRows={10}
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} className="flex justify-center">
              <Grid item>
                <Button type="submit" disabled={uploading} className="bg-[#f0ca83] hover:bg-[#f6b741] font-bold text-[#303030] py-2 px-3">
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" type="reset" className="border-[#f0ca83] hover:border-[#f6b741] font-bold text-[#303030] py-2 px-3">
                  Reset&nbsp;All
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );

}

export default AddWig