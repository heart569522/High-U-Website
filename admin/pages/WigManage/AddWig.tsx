import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Typography,
  Toolbar,
  Grid,
  TextField,
} from "@mui/material";
import { storage } from '../../pages/api/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

type ImageWig = {
  arImage: File | null;
  mainImage: File | null;
  subImages: (File | {})[];
};

const MAX_SUB_IMAGES = 6;
const INITIAL_SUB_IMAGES_COUNT = 3;

const drawerWidth = 240;

const AddWig_Form = () => {
  const [title, setTitle] = useState('');

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

  const [arImagePreview, setArImagePreview] = useState<string>('');
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [subImagePreviews, setSubImagePreviews] = useState<string[]>(new Array(INITIAL_SUB_IMAGES_COUNT).fill('')); // initialize with empty strings

  const arImageRef = useRef<HTMLInputElement>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const subImageRefs = useRef<(HTMLInputElement | null)[]>(new Array(INITIAL_SUB_IMAGES_COUNT).fill(null));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name } = event.target;

    if (name === "subImage" && typeof index !== "undefined" && event.target.files) {
      const subImages = [...imageWig.subImages];
      subImages[index] = event.target.files[0];

      setImageWig({
        ...imageWig,
        subImages,
      });

      const reader = new FileReader();
      reader.onload = () => {
        const previews = [...subImagePreviews];
        previews[index] = reader.result as string;
        setSubImagePreviews(previews);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else if (event.target.files) {
      setImageWig({
        ...imageWig,
        [name]: event.target.files[0],
      });

      const reader = new FileReader();
      reader.onload = () => {
        if (name === 'arImage') {
          setArImagePreview(reader.result as string);
        } else if (name === 'mainImage') {
          setMainImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleAddSubImage = () => {
    if (imageWig.subImages.length < MAX_SUB_IMAGES) {
      setImageWig({
        ...imageWig,
        subImages: [...imageWig.subImages, {}], // add an empty object to represent the new sub-image
      });
      setSubImagePreviews([...subImagePreviews, '']);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!imageWig.arImage) {
        throw new Error('File is required')
      }

      if (!imageWig.mainImage) {
        throw new Error('File is required')
      }

      // Upload all images to storage
      const arImageName = imageWig.arImage.name;
      const mainImageName = imageWig.mainImage.name;
      const subImageNames = (imageWig.subImages as File[]).map((subImage) => subImage.name);

      const arImageRef = ref(
        storage,
        `wig_images/${title}/${'AR_'+arImageName}`
      );
      const mainImageRef = ref(
        storage,
        `wig_images/${title}/${'MAIN_'+mainImageName}`
      );
      const subImageRefs = subImageNames.map((name, i) =>
        ref(storage, `wig_images/${title}/sub_images/${'SUB_'+i+'_'+name}`)
      );

      const arUploadTask = uploadBytesResumable(
        arImageRef,
        imageWig.arImage
      );
      const mainUploadTask = uploadBytesResumable(
        mainImageRef,
        imageWig.mainImage
      );
      const subUploadTasks = imageWig.subImages.map((subImage, index) => {
        if (!(subImage instanceof File)) {
          throw new Error(`Invalid file object at index ${index}`);
        }
        return uploadBytesResumable(subImageRefs[index], subImage);
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
      const response = await fetch("http://localhost:8000/api/wig/addWig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          arImage: arImageUrl,
          mainImage: mainImageUrl,
          subImages: subImageUrls,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      // Reset form and show success message

    } catch (error) {
      console.error(error);

    }
  }


  return (
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

          <div className="mb-3">
            <label className="text-black">
              AR Image:
              <input
                type="file"
                name="arImage"
                accept="image/*"
                onChange={(e) => {
                  handleInputChange(e);
                  const file = e.target.files && e.target.files[0];
                  if (file) {
                    previewImage(file, "arImagePreview");
                  }
                }}
              />
            </label>
            {imageWig.arImage && (
              <div className="mt-2">
                <Typography>AR Image Preview:</Typography>
                <img
                  src={arImagePreview}
                  alt="AR Image Preview"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="text-black">
              Main Image:
              <input
                type="file"
                name="mainImage"
                accept="image/*"
                onChange={(e) => {
                  handleInputChange(e);
                  const file = e.target.files && e.target.files[0];
                  if (file) {
                    previewImage(file, "mainImagePreview");
                  }
                }}
              />
            </label>
            {imageWig.mainImage && (
              <div className="mt-2">
                <Typography>Main Image Preview:</Typography>
                <img
                  src={mainImagePreview}
                  alt="Main Image Preview"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </div>
            )}
          </div>
          {imageWig.subImages.map((subImage, index) => (
            <div className="mb-3" key={index}>
              <label className="text-black">
                {`Sub Image ${index + 1}:`}
                <input
                  type="file"
                  name="subImage"
                  accept="image/*"
                  onChange={(e) => {
                    handleInputChange(e, index);
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      previewImage(file, `subImagePreview-${index}`);
                    }
                  }}
                />
              </label>
              {subImage && (
                <div className="mt-2">
                  <Typography>{`Sub Image ${index + 1} Preview:`}</Typography>
                  <img
                    src={subImagePreviews[index]}
                    alt={`Sub Image ${index + 1} Preview`}
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                  />
                </div>
              )}
            </div>
          ))}
          {imageWig.subImages.length < MAX_SUB_IMAGES && (
            <button
              type="button"
              className="bg-black text-white"
              onClick={handleAddSubImage}
            >
              Add Sub Image
            </button>
          )}
          <br />
          <button type="submit" className="bg-black text-white">
            Submit
          </button>
        </form>
      </Box>
    </Box>
  );

}

export default AddWig_Form