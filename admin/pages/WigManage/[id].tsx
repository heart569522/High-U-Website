import { useEffect, useRef, useState } from 'react'
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
import { ref, uploadBytesResumable, getDownloadURL, UploadTaskSnapshot } from 'firebase/storage'
import Head from 'next/head';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import withProtectedPage from "../../lib/withProtectedPage";

const MAX_SUB_IMAGES = 6;
const INITIAL_SUB_IMAGES_COUNT = 3;

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

type PageParams = {
  id: string;
}

type ContentPageProps = {
  wig: Wig;
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
}

type GetOneWigRequest = {
  id: string;
}

type GetOneWigResponse = ResponseFromServer;

type ResponseFromServer = Wig;

export async function getStaticProps({ params }: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
  try {
    const request: GetOneWigRequest = {
      id: params?.id || ""
    };

    const response = await fetch(`${process.env.API_URL}/api/wig/getOneWig?id=${request.id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseFromServer: GetOneWigResponse = await response.json()

    return {
      props: {
        wig: {
          _id: responseFromServer._id,
          ar_image: responseFromServer.ar_image,
          main_image: responseFromServer.main_image,
          sub_image: responseFromServer.sub_image,
          title: responseFromServer.title,
          style: responseFromServer.style,
          type: responseFromServer.type,
          color: responseFromServer.color,
          size: responseFromServer.size,
          price: responseFromServer.price,
          desc: responseFromServer.desc,
        }
      }
    }
  } catch (error: any) {
    console.log("error", error.message);
    return {
      props: {
        wig: {
          _id: '',
          ar_image: '',
          main_image: '',
          sub_image: [],
          title: '',
          style: '',
          type: '',
          color: '',
          size: [0],
          price: 0,
          desc: ''
        }
      }
    }
  }
}

export async function getStaticPaths() {
  try {
    const response = await fetch(`${process.env.API_URL}/api/wig/getAllWigs`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await response.text();
    const wigFromServer: [Wig] = responseData.startsWith('[') ? JSON.parse(responseData) : [];

    return {
      paths: wigFromServer.map((wig) => ({
        params: {
          id: wig._id
        }
      })),
      fallback: false
    };
  } catch (error: any) {
    console.log("error", error.message);
    return {
      paths: [],
      fallback: false
    };
  }
}

type ImageWig = {
  arImage: File | null;
  mainImage: File | null;
  subImages: (File | undefined | {})[]; // Allow for null values
};

function WigEdit({ wig: { _id, ar_image, main_image, sub_image, title, style, type, color, size, price, desc } }: ContentPageProps) {

  const [wigTitle, setWigTitle] = useState(title);
  const [wigStyle, setWigStyle] = useState(style);
  const [wigType, setWigType] = useState(type);
  const [wigColor, setWigColor] = useState(color);
  const [wigSize, setWigSize] = useState(size);
  const [wigPrice, setWigPrice] = useState(price);
  const [wigDesc, setWigDesc] = useState(desc);

  const handleTypeChange = (event: { target: { value: string; }; }) => {
    setWigType(event.target.value as string);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  async function createFileFromUrl(url: string, fileName: string): Promise<File> {
    const response = await fetch(url);
    const data = await response.blob();
    const type = response.headers.get("content-type");
    return new File([data], fileName, { type: type !== null ? type : undefined });
  }

  const [imageWig, setImageWig] = useState<ImageWig>({
    arImage: null,
    mainImage: null,
    subImages: sub_image
      ? sub_image.map((url) => ({ url, file: null })) // initialize with null file values
      : new Array(INITIAL_SUB_IMAGES_COUNT).fill({}), // initialize with empty objects if sub_image is not defined
  });

  useEffect(() => {
    // Fetch and set the arImage
    if (ar_image) {
      createFileFromUrl(ar_image, "arImage.png").then((file) => {
        setImageWig((prevState) => ({ ...prevState, arImage: file }));
      });
    }

    // Fetch and set the mainImage
    if (main_image) {
      createFileFromUrl(main_image, "mainImage.png").then((file) => {
        setImageWig((prevState) => ({ ...prevState, mainImage: file }));
      });
    }

    // Upload and set the subImages
    if (sub_image) {
      Promise.all(
        sub_image.map(async (url) => {
          const file = await createFileFromUrl(url, "subImage.png");
          return file; // only return the File object, not an object with url and file properties
        })
      ).then((subImages) => {
        setImageWig((prevState) => ({
          ...prevState,
          subImages: subImages,
        }));
      });
    }
  }, [ar_image, main_image, sub_image, setImageWig]);

  const [arImagePreview, setArImagePreview] = useState<string | null>(ar_image ? ar_image.toString() : null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(main_image ? main_image.toString() : null);
  const [subImagePreviews, setSubImagePreviews] = useState<string[]>(sub_image.map(image => image.toString()));

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

  const resizeAndCropImage = (imageFile: File, fileName: string, type: 'ar' | 'main' | 'sub', width = 525, height = 700): Promise<File> => {
    if (type === 'ar' || type === 'main' || type === 'sub') {
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    uploadArImage: boolean = true
  ) => {
    setAlertSuccess(false);
    setUploading(true);
    e.preventDefault();

    try {
      if (!imageWig.mainImage) {
        throw new Error("File is required");
      }

      const mainImageCrop = await resizeAndCropImage(
        imageWig.mainImage,
        "mainImage.png",
        "main"
      );
      const subImageCrops = await Promise.all(
        imageWig.subImages.map((subImage, index) => {
          if (typeof subImage === "string") {
            return subImage;
          } else if (
            !(subImage instanceof File || subImage === null || subImage === undefined)
          ) {
            throw new Error(`Invalid file object at index ${index + 1}`);
          } else if (subImage instanceof File) {
            return resizeAndCropImage(
              subImage,
              `subImage_${index}.png`,
              "sub"
            );
          } else {
            return subImage;
          }
        })
      );

      const subImageNames = (subImageCrops as (File | string)[]).map(
        (subImage, i) =>
          typeof subImage === "string" ? `subImage_${i}.png` : subImage.name
      );

      const mainImageRef = ref(
        storage,
        `wig_images/${title}/${"MAIN_Image"}`
      );
      const subImageRefs = subImageNames.map((name, i) =>
        ref(storage, `wig_images/${title}/sub_images/${'SUB_Image_' + i}`)
      );

      const mainUploadTask = uploadBytesResumable(mainImageRef, mainImageCrop, {
        contentType: "image/png",
      });
      const subUploadTasks = subImageCrops.map((subImage, index) => {
        if (!(subImage instanceof File)) {
          return subImage;
        }
        return uploadBytesResumable(subImageRefs[index], subImage, {
          contentType: "image/png",
        });
      });

      let arImageUrl;
      if (uploadArImage && imageWig.arImage) {
        const arImageCrop = await resizeAndCropImage(
          imageWig.arImage,
          "arImage.png",
          "ar"
        );
        const arImageRef = ref(
          storage,
          `wig_images/${title}/${"AR_Image"}`
        );
        const arUploadTask = uploadBytesResumable(arImageRef, arImageCrop, {
          contentType: "image/png",
        });
        const arSnapshot = await arUploadTask;
        arImageUrl = await getDownloadURL(arSnapshot.ref);
      }

      // Wait for all images to finish uploading
      const [mainSnapshot, ...subSnapshots] = await Promise.all([
        mainUploadTask,
        ...subUploadTasks,
      ]);

      const mainImageUrl = await getDownloadURL(mainSnapshot.ref);
      const subImageUrls = await Promise.all(
        subSnapshots.map((snapshot) => {
          if (typeof snapshot === "string") {
            return snapshot; // return the string value as is
          } else if (snapshot && snapshot.ref) {
            return getDownloadURL(snapshot.ref);
          } else {
            throw new Error(`Invalid snapshot object: ${snapshot}`);
          }
        })
      );

      // Add wig data to database
      const response = await fetch(`${process.env.API_URL}/api/wig/updateWig?id=` + _id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: wigTitle,
          style: wigStyle,
          type: wigType,
          color: wigColor,
          size: wigSize,
          price: wigPrice,
          desc: wigDesc,
          arImage: arImageUrl,
          mainImage: mainImageUrl,
          subImages: subImageUrls,
        }),
      });
      console.log(response);
      setAlertSuccess(true);

      if (!response.ok) {
        throw new Error(await response.text());
      }
      window.location.href = '../WigManage'
    } catch (error) {
      console.error(error);
      setAlertError(true)
    } finally {
      setUploading(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Head><title>Edit Wig | High U Administrator</title></Head>
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
                Edit&nbsp;Wig
              </Typography>
            </Grid>
          </Grid>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={uploading}
          >
            <CircularProgress color="inherit" />
            <Typography>&nbsp;Updating...</Typography>
          </Backdrop>
          <Snackbar open={alertSuccess} autoHideDuration={5000} onClose={handleCloseAlertSuccess}>
            <Alert onClose={handleCloseAlertSuccess} severity="success" sx={{ width: '100%' }}>
              Update Wig Successfully!
            </Alert>
          </Snackbar>
          <Snackbar open={alertError} autoHideDuration={5000} onClose={handleCloseAlertError}>
            <Alert onClose={handleCloseAlertError} severity="error" sx={{ width: '100%' }}>
              Update Wig Error!
            </Alert>
          </Snackbar>
          <form onSubmit={handleSubmit}>
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
                          src={arImagePreview || ar_image}
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
                          src={mainImagePreview || main_image}
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
                  value={wigTitle ? wigTitle : ""}
                  fullWidth
                  name='title'
                  variant='outlined'
                  className="font-bold rounded pb-3"
                  onChange={(e) => setWigTitle(e.target.value)}
                  inputProps={{ style: { color: "#303030" } }}
                  sx={{ color: '#303030' }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography className="text-[#303030] font-bold pb-2 text-lg">Style</Typography>
                <TextField
                  type='text'
                  value={wigStyle ? wigStyle : ""}
                  fullWidth
                  name='style'
                  variant='outlined'
                  className="font-bold rounded pb-3"
                  onChange={(e) => setWigStyle(e.target.value)}
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
                    value={wigType ? wigType : ""}
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
                  value={wigColor ? wigColor : ""}
                  fullWidth
                  name='color'
                  variant='outlined'
                  className="font-bold rounded pb-3"
                  onChange={(e) => setWigColor(e.target.value)}
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
                      value={wigSize[0] ? wigSize[0] : 0}
                      fullWidth
                      name="sizeLength"
                      variant="outlined"
                      className="font-bold rounded pb-3"
                      onChange={(e) => {
                        const parsedValue = parseInt(e.target.value);
                        if (!isNaN(parsedValue) && parsedValue >= 0) {
                          setWigSize([parsedValue, wigSize[1], wigSize[2], wigSize[3]]);
                        } else {
                          setWigSize([0, wigSize[1], wigSize[2], wigSize[3]]);
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
                      value={wigSize[1] ? wigSize[1] : 0}
                      fullWidth
                      name="sizeCircumference"
                      variant="outlined"
                      className="font-bold rounded pb-3"
                      onChange={(e) => {
                        const parsedValue = parseInt(e.target.value);
                        if (!isNaN(parsedValue) && parsedValue >= 0) {
                          setWigSize([wigSize[0], parsedValue, wigSize[2], wigSize[3]]);
                        } else {
                          setWigSize([wigSize[0], 0, wigSize[2], wigSize[3]]);
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
                      value={wigSize[2] ? wigSize[2] : 0}
                      fullWidth
                      name="sizeEarToEar"
                      variant="outlined"
                      className="font-bold rounded pb-3"
                      onChange={(e) => {
                        const parsedValue = parseInt(e.target.value);
                        if (!isNaN(parsedValue) && parsedValue >= 0) {
                          setWigSize([wigSize[0], wigSize[1], parsedValue, wigSize[3]]);
                        } else {
                          setWigSize([wigSize[0], wigSize[1], 0, wigSize[3]]);
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
                      value={wigSize[3] ? wigSize[3] : 0}
                      fullWidth
                      name="sizeFrontToBack"
                      variant="outlined"
                      className="font-bold rounded pb-3"
                      onChange={(e) => {
                        const parsedValue = parseInt(e.target.value);
                        if (!isNaN(parsedValue) && parsedValue >= 0) {
                          setWigSize([wigSize[0], wigSize[1], wigSize[2], parsedValue]);
                        } else {
                          setWigSize([wigSize[0], wigSize[1], wigSize[2], 0]);
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
                  value={wigPrice ? wigPrice : 0}
                  fullWidth
                  name='price'
                  variant='outlined'
                  className="font-bold rounded pb-3"
                  onChange={(e) => {
                    const parsedValue = parseInt(e.target.value);
                    if (!isNaN(parsedValue) && parsedValue >= 0) {
                      setWigPrice(parsedValue);
                    } else {
                      setWigPrice(0);
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
                  value={wigDesc ? wigDesc : ""}
                  fullWidth
                  name='desc'
                  variant='outlined'
                  className="font-bold rounded pb-3"
                  onChange={(e) => setWigDesc(e.target.value)}
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
                  Update
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

  )
}

export default withProtectedPage(WigEdit);