// can you help me for create form add image wig, it have ar_image, main_image, sub_image 
// on input of sub_image I want to add sub image not more than 6 images and want to have input of sub_image already 3 then 
// if user want to add more sub_image then press button to add input and input will be added one by one but no more than 6 pre-existing 3 sub_images
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import sharp from 'sharp';

type ImageWig = {
  arImage: File | null;
  mainImage: File | null;
  subImages: (File | {})[];
};

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
      main: "#303030",
    },
    secondary: {
      main: "#F0CA83"
    }
  },
});

const AddWig_Form = () => {

  const [imageWig, setImageWig] = useState<ImageWig>({
    arImage: null,
    mainImage: null,
    subImages: new Array(INITIAL_SUB_IMAGES_COUNT).fill({}), // initialize with empty objects
  });

  const [formErrors, setFormErrors] = useState({
    arImage: '',
    mainImage: '',
    subImages: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, files } = event.target;

    if (name === "subImage" && typeof index !== "undefined" && files) {
      const subImages = [...imageWig.subImages];
      subImages[index] = files[0];

      setImageWig({
        ...imageWig,
        subImages,
      });
    } else if (files) {
      setImageWig({
        ...imageWig,
        [name]: files[0],
      });
    }
  };

  const handleAddSubImage = () => {
    if (imageWig.subImages.length < MAX_SUB_IMAGES) {
      setImageWig({
        ...imageWig,
        subImages: [...imageWig.subImages, {}], // add an empty object to represent the new sub-image
      });
    }
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let errors = {
      arImage: '',
      mainImage: '',
      subImages: '',
    };

    if (!imageWig.arImage) {
      errors = {
        ...errors,
        arImage: 'Please select an AR image.',
      };
    }

    if (!imageWig.mainImage) {
      errors = {
        ...errors,
        mainImage: 'Please select a main image.',
      };
    }

    const subImages = imageWig.subImages.filter((subImage) => subImage instanceof File);
    if (subImages.length === 0) {
      errors = {
        ...errors,
        subImages: 'Please select at least one sub image.',
      };
    } else if (subImages.length > MAX_SUB_IMAGES) {
      errors = {
        ...errors,
        subImages: `Please select no more than ${MAX_SUB_IMAGES} sub images.`,
      };
    }

    setFormErrors(errors);

    if (Object.values(errors).every((val) => val === '')) {
      // Handle form submission here
      console.log('Form submitted.');
    }
  };
  return (
    <ThemeProvider theme={theme}>
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
                Add Wig
              </Typography>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit}>
            <label className='text-black'>
              AR Image:
              <input type="file" name="arImage" accept="image/*" onChange={handleInputChange} />
            </label>
            <label className='text-black'>
              Main Image:
              <input type="file" name="mainImage" accept="image/*" onChange={handleInputChange} />
            </label>
            {imageWig.subImages.map((subImage, index) => (
              <label className='text-black' key={index}>
                {`Sub Image ${index + 1}:`}
                <input type="file" name="subImage" accept="image/*" onChange={(event) => handleInputChange(event, index)} />
              </label>
            ))}
            {imageWig.subImages.length < MAX_SUB_IMAGES && (
              <button type="button" className="bg-black text-white" onClick={handleAddSubImage}>
                Add Sub Image
              </button>
            )}
            <button type="submit" className="bg-black text-white">Submit</button>
          </form>
        </Box>
      </Box>
    </ThemeProvider>

  )
}

export default AddWig_Form