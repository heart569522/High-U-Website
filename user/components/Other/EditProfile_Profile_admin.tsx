import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Grid,
    Typography,
    CircularProgress,
    TextField
} from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const theme = createTheme({
    palette: {
        primary: {
            main: "#303030",
        },
        secondary: {
            main: "#303030",
        },
    },
    typography: {
        fontFamily: [
            'Prompt, sans-serif'
        ].join(','),
    },

});


export default function EditProfile_Profile_admin() {
    const [editFirstname, setEditFirstname] = useState('');
    const [editLastname, setEditLastname] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editEmail, setEditEmail] = useState('');

    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleChange = (setState: (value: string) => void) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setState(event.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <ThemeProvider theme={theme}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Typography className="text-[#303030] font-bold pb-2">Firstname</Typography>
                    <TextField
                        type='text'
                        defaultValue='admin'
                        fullWidth
                        name='editFirstname'
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={handleChange(setEditFirstname)}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography className="text-[#303030] font-bold pb-2">Lastname</Typography>
                    <TextField
                        type='text'
                        defaultValue='test'
                        fullWidth
                        name='editLastname'
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={handleChange(setEditLastname)}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography className="text-[#303030] font-bold pb-2">Username</Typography>
                    <TextField
                        type='text'
                        defaultValue='admin'
                        fullWidth
                        name='editUsername'
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={handleChange(setEditUsername)}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography className="text-[#303030] font-bold pb-2">Email Address</Typography>
                    <TextField
                        type='email'
                        defaultValue='admin@hu.com'
                        fullWidth
                        name='editEmail'
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={handleChange(setEditEmail)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <hr className="w-full h-[1px] rounded border-0 bg-[#747474] mt-1"></hr>
                </Grid>
                <Grid item xs={12} sm={6} className="flex items-center">
                    <input
                        accept="image/*"
                        style={{ display: "none", }}
                        id="upload-button"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="upload-button">
                        <Button
                            variant='contained'
                            className="font-bold mb-2 hover:bg-[#4f4f4f]"
                            component="span"
                            startIcon={<AddAPhotoIcon />}
                        >
                            Edit Image
                        </Button>
                    </label>
                    <Avatar
                        src={previewUrl || ""}
                        className="w-24 h-24 ml-5 rounded-full max-sm:mx-auto"
                    />
                </Grid>
                <Grid item xs={12} sm={6} className="flex items-center justify-end">
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        className="bg-[#303030] font-bold mb-2 hover:bg-[#080808] max-sm:w-full"
                        disabled={isUploading}
                        onClick={handleUpdate}
                    >
                        {isUploading ? (
                            <CircularProgress size={24} />
                        ) : (
                            "Update"
                        )}
                    </Button>
                </Grid>

            </Grid>
        </ThemeProvider>

    );
}
