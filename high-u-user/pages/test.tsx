import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress
} from '@mui/material';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const ProfilePicture: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImage(null);
      setPreviewUrl(null);
      return;
    }
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = () => {
    if (!image) {
      return;
    }
    setIsUploading(true);
    // upload image to storage here
    setIsUploading(false);
  };


  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Avatar
            src={previewUrl || ""}
            className="w-28 h-28 m-auto rounded-full"
          />
          <input
            accept="image/*"
            style={{ display: "none", }}
            id="upload-button"
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="upload-button">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<AddAPhotoIcon />}
            >
              Upload
            </Button>
          </label>
        </Grid>
        {image && (
          <Grid item xs={12}>
            <Typography>{image.name}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={isUploading}
            onClick={handleUpdate}
          >
            {isUploading ? (
              <CircularProgress size={24} />
            ) : (
              "Update profile picture"
            )}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePicture;
