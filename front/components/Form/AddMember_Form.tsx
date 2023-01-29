import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import { getWig, updateWig } from '../api/wigApi'
import {
    Box,
    Typography,
    Toolbar,
    Grid,
    Hidden,
    ButtonGroup,
    Button,
    TextField,
    Skeleton,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import DrawerBar from '../Navigation/DrawerBar';
import Loading from '../Other/Loading';

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

const AddMember_Form = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, [loading]);

    const [error, setError] = useState<Error | null>(null);
    const router = useRouter()

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg';

    useEffect(() => {
        if (!previewUrl) {
            return;
        }
        return () => URL.revokeObjectURL(previewUrl);
    }, [previewUrl]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (!image) {
            setImage(null);
            setPreviewUrl(null);
            return;
        }
        setImage(e.target.files ? e.target.files[0] : null);
        setPreviewUrl(URL.createObjectURL(image));
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === " ") {
            event.preventDefault();
        }
    };

    const handleReset = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setUsername("");
        setPassword("");
        setImage(null);
        setPreviewUrl(null);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const formData = new FormData()
            formData.append('firstname', firstname)
            formData.append('lastname', lastname)
            formData.append('email', email)
            formData.append('username', username)
            formData.append('password', password)
            if (image !== null) {
                formData.append('image', image)
            }
            alert('Wig created successfully');
            // console.log(firstname)
            // console.log(image)
            const response = await fetch('/api/wigs', {
                method: 'POST',
                body: formData,
            })
            if (!response.ok) {
                throw new Error(response.statusText)
            } else { }
            // router.push('/WigManage');
            // navigate to wig listing page
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
            handleReset();

        }
    }

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
                                    Add Member
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <form onSubmit={handleSubmit} onReset={handleReset} className="pt-3">
                        <Grid container className="pt-3" spacing={3}>
                            <Grid item xs={12} md={4}>
                                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-72 rounded-md" />) : (
                                    <center>
                                        <input
                                            accept="image/*"
                                            style={{ display: "none", }}
                                            id="upload-button"
                                            type="file"
                                            onChange={handleImageChange}
                                        />
                                        <img
                                            src={previewUrl || defaultImageUrl}
                                            className="rounded-lg object-top object-cover h-auto w-96"
                                        />
                                        <label htmlFor="upload-button">
                                            <Button
                                                variant='contained'
                                                className="bg-[#F0CA83] text-[#303030] font-bold mb-2 hover:bg-[#f3b94d] mt-3"
                                                component="span"
                                                startIcon={<AddAPhotoIcon />}
                                            >
                                                Add Image
                                            </Button>
                                        </label>
                                    </center>
                                )}
                            </Grid>
                            <Grid item xs={12} md={8}>
                                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                                    <Grid item xs={12}>
                                        <Typography className="text-[#303030] font-bold pb-2 text-lg">Firstname</Typography>
                                        <TextField
                                            type='text'
                                            value={firstname}
                                            fullWidth
                                            name='firstname'
                                            variant='outlined'
                                            className="font-bold rounded pb-3"
                                            onChange={(e) => setFirstname(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            inputProps={{ style: { color: "#303030" } }}
                                            sx={{ color: '#303030' }}
                                            required
                                            focused
                                        />
                                    </Grid>
                                )}
                                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                                    <Grid item xs={12}>
                                        <Typography className="text-[#303030] font-bold pb-2 text-lg">Lastname</Typography>
                                        <TextField
                                            type='text'
                                            value={lastname}
                                            fullWidth
                                            name='lastname'
                                            variant='outlined'
                                            className="font-bold rounded pb-3"
                                            onChange={(e) => setLastname(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            inputProps={{ style: { color: "#303030" } }}
                                            sx={{ color: '#303030' }}
                                            required
                                            focused
                                        />
                                    </Grid>
                                )}
                                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                                    <Grid item xs={12}>
                                        <Typography className="text-[#303030] font-bold pb-2 text-lg">Email</Typography>
                                        <TextField
                                            type="email"
                                            value={email}
                                            fullWidth
                                            name='email'
                                            variant='outlined'
                                            className="font-bold rounded pb-3"
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            inputProps={{ style: { color: "#303030" } }}
                                            sx={{ color: '#303030' }}
                                            required
                                            focused
                                        />
                                    </Grid>
                                )}
                                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                                    <Grid item xs={12}>
                                        <Typography className="text-[#303030] font-bold pb-2 text-lg">Username</Typography>
                                        <TextField
                                            type='text'
                                            value={username}
                                            fullWidth
                                            name='username'
                                            variant='outlined'
                                            className="font-bold rounded pb-3"
                                            onChange={(e) => setUsername(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            inputProps={{ style: { color: "#303030" } }}
                                            sx={{ color: '#303030' }}
                                            required
                                            focused
                                        />
                                    </Grid>
                                )}
                                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 my-3 rounded-md" />) : (
                                    <Grid item xs={12}>
                                        <Typography className="text-[#303030] font-bold pb-2 text-lg">Password</Typography>
                                        <TextField
                                            type='text'
                                            value={password}
                                            fullWidth
                                            name='password'
                                            variant='outlined'
                                            className="font-bold rounded pb-3"
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            inputProps={{ style: { color: "#303030" } }}
                                            sx={{ color: '#303030' }}
                                            multiline
                                            maxRows={5}
                                            required
                                            focused
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Hidden mdDown>
                                        {loading ? (<Skeleton animation="wave" variant="rectangular" sx={{ float: 'right' }} className="w-1/5 justify-end h-10 my-1 rounded-md" />) : (
                                            <ButtonGroup variant="contained" className="gap-1" sx={{ float: 'right' }} aria-label="contained button group">
                                                <Button type='submit' className="bg-[#303030] text-white hover:bg-emerald-600">OK</Button>
                                                <Button type='reset' className="bg-[#303030] text-white hover:bg-red-500">Reset</Button>
                                            </ButtonGroup>
                                        )}
                                    </Hidden>
                                    <Hidden mdUp>
                                        {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-10 my-1 rounded-md" />) : (
                                            <ButtonGroup variant="contained" className="gap-1 my-2" fullWidth aria-label="contained button group">
                                                <Button type='submit' className="bg-[#303030] text-white hover:bg-emerald-600">OK</Button>
                                                <Button type='reset' className="bg-[#303030] text-white hover:bg-red-500">Reset</Button>
                                            </ButtonGroup>
                                        )}
                                    </Hidden>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </ThemeProvider>

    )
}

export default AddMember_Form