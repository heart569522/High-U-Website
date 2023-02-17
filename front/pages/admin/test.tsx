import { useRef, useState } from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

interface Props {}

const ExampleComponent: React.FC<Props> = () => {
  const [subImageCount, setSubImageCount] = useState(3);
  const [previewSubImages, setPreviewSubImages] = useState<string[]>([]);
  const subImageInputsRef = useRef<HTMLInputElement[]>([]);

  const handleSubImageChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewSubImages((prevPreviewSubImages) => {
          const newPreviewSubImages = [...prevPreviewSubImages];
          newPreviewSubImages[index] = reader.result as string;
          return newPreviewSubImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubImageReset = (index: number) => {
    setPreviewSubImages((prevPreviewSubImages) => {
      const newPreviewSubImages = [...prevPreviewSubImages];
      newPreviewSubImages[index] = '';
      return newPreviewSubImages;
    });
    subImageInputsRef.current[index].value = ''; // clear the file input value
  };

  const handleAddSubImageInput = () => {
    setSubImageCount((prevCount) => prevCount + 1);
  };

  const handleSubImageClick = (index: number) => {
    subImageInputsRef.current[index].click(); // trigger click event on file input
  };

  const renderSubImageInputFields = () => {
    const subImageFields = [];
    for (let i = 0; i < subImageCount; i++) {
      subImageFields.push(
        <Box key={i} className="px-6 pt-4 pb-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
          <input
            ref={(el) => (subImageInputsRef.current[i] = el)}
            accept="image/*"
            style={{ display: 'none' }}
            id={`subImage${i}`}
            type="file"
            onChange={(e) => handleSubImageChange(e, i)}
          />
          <Typography variant="h5">{`Sub Image ${i + 1}`}</Typography>
          {previewSubImages[i] ? (
            <center>
              <img src={previewSubImages[i]} className="rounded-lg object-contain h-[400px] w-80 py-2" />
              <Box className="text-center items-center justify-center flex flex-col">
                <Tooltip title="Reset Image">
                  <IconButton onClick={() => handleSubImageReset(i)} className="text-gray-400 hover:text-red-400">
                    <RotateLeftIcon className="w-8 h-8" fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            </center>
          ) : (
            <Box>
              <AddPhotoAlternateOutlinedIcon fontSize="large" />
              <Typography variant="subtitle1">Click to upload</Typography>
              <Typography variant="subtitle2">*Only Vertical Image</Typography>
              <Typography variant="subtitle2">**PNG or JPG (Maximum 1080x1920px)</Typography>
            </Box>
          )}
        </Box>
      );
    }
    return subImageFields;
  };

  const handleAddSubImage = () => {
    if (subImageCount < 6) {
      setSubImageCount(subImageCount + 1);
    }
  };

  return (
    <Box>
      {renderSubImageInputFields()}
      {subImageCount < 6 && (
        <Button variant="contained" color="primary" onClick={handleAddSubImage}>
          Add Sub Image
        </Button>
      )}
    </Box>
  );
}

export default ExampleComponent