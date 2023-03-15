import Head from 'next/head';
import Image from 'next/image';
import { storage } from '../api/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';

import { Box, Toolbar, Grid, Skeleton, Typography, Button, TextField, Hidden, ButtonGroup, Snackbar, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import DrawerBar from '../../components/Navigation/DrawerBar';

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

type PageParams = {
    id: string;
}

type ContentPageProps = {
    member: Member;
}

type Member = {
    _id: string;
    image: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
}

type ResponseFromServer = {
    _id: string;
    image: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
}

export async function getStaticProps({ params }: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
    try {

        let response = await fetch("http://localhost:8000/api/member/getOneMember?id=" + params?.id)

        let responseFromServer: ResponseFromServer = await response.json()

        return {
            props: {
                member: {
                    _id: responseFromServer._id,
                    image: responseFromServer.image,
                    firstname: responseFromServer.firstname,
                    lastname: responseFromServer.lastname,
                    email: responseFromServer.email,
                    username: responseFromServer.username,
                    password: responseFromServer.password,
                }
            }
        }
    } catch (e) {
        console.log("error", e);
        return {
            props: {
                member: {
                    _id: '',
                    image: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    username: '',
                    password: '',
                }
            }
        }
    }
}

export async function getStaticPaths() {
    let members = await fetch("http://localhost:8000/api/member/getAllMember");

    let memberFromServer: [Member] = await members.json();

    return {
        paths: memberFromServer.map((member) => {
            return {
                params: {
                    id: member._id
                }
            }
        }),
        fallback: false
    }
}

function MemberEdit({ member: { _id, image, firstname, lastname, email, username, password } }: ContentPageProps) {

    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [memberFirstname, setMemberFirstname] = useState(firstname);
    const [memberLastname, setMemberLastname] = useState(lastname);
    const [memberEmail, setMemberEmail] = useState(email);
    const [memberUsername, setMemberUsername] = useState(username);
    const [memberPassword, setMemberPassword] = useState(password);

    const [progress, setProgress] = useState(0)
    const [memberImage, setMemberImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg';
    const [url, setUrl] = useState<string | null>(null)

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Fetch data
        setTimeout(() => {
            setLoading(false);
        }, 700);
    }, [loading]);


    useEffect(() => {
        if (!previewUrl) {
            return;
        }
        return () => URL.revokeObjectURL(previewUrl);
    }, [previewUrl]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (!image) {
            setMemberImage(null);
            setPreviewUrl(null);
            return;
        }
        setMemberImage(e.target.files ? e.target.files[0] : null);
        setPreviewUrl(URL.createObjectURL(image));
    }

    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (firstname && lastname && email && username && password) {
            try {
                let imageUrl = image; // use existing image URL by default

                if (memberImage) {
                    // Upload the new image
                    const imgName = memberImage.name
                    const storageRef = ref(storage, `member_images/${imgName}`)
                    const uploadTask = uploadBytesResumable(storageRef, memberImage)

                    uploadTask.on(
                        'state_changed',
                        (snapshot: any) => {
                            setProgress(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            )
                        },
                        (error: any) => {
                            setError(error)
                        },
                        async () => {
                            imageUrl = await getDownloadURL(uploadTask.snapshot.ref)
                            setUrl(imageUrl)

                            // Update the member with the new image URL
                            let response = await fetch("http://localhost:8000/api/member/updateMember?id=" + _id, {
                                method: 'POST',
                                headers: {
                                    Accept: "application/json, text/plain, */*",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    image: imageUrl,
                                    firstname: memberFirstname,
                                    lastname: memberLastname,
                                    email: memberEmail,
                                    username: memberUsername,
                                    password: memberPassword
                                })
                            })

                            response = await response.json();
                            console.log(response)
                            setMessage("Member Edited Successfully!");
                            window.location.href = '../MemberManage'
                            setOpenAlert(true);
                            if (!response.ok) {
                                Error('no response')
                            }
                        }
                    )
                } else {
                    // Update the member without changing the image URL
                    let response = await fetch("http://localhost:8000/api/member/updateMember?id=" + _id, {
                        method: 'POST',
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            image: imageUrl,
                            firstname: memberFirstname,
                            lastname: memberLastname,
                            email: memberEmail,
                            username: memberUsername,
                            password: memberPassword
                        })
                    })

                    response = await response.json();
                    console.log(response)
                    setMessage("Member Edited Successfully!");
                    window.location.href = '../MemberManage'
                    setOpenAlert(true);
                    if (!response.ok) {
                        Error('no response')
                    }
                }
            } catch (error: any) {
                console.error(error)
                setError("An error occurred while updating the member. Please try again later.");
                setOpenAlert(true);
            }
        } else {
            setError("Please complete all fields.");
            setOpenAlert(true);
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <Head><title>Member Edit | High U Administrator</title></Head>
            <Box
                component="main"
                className="h-full p-5 ml-[240px] max-[899px]:ml-0"
                sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {message ?
                    <Snackbar open={openAlert} autoHideDuration={3000}>
                        <Alert icon={false} onClose={handleCloseAlert} className="bg-green-700 text-white text-lg max-sm:text-base">
                            {message}
                        </Alert>
                    </Snackbar>
                    : null}
                {error ?
                    <Snackbar open={openAlert} autoHideDuration={3000}>
                        <Alert icon={false} onClose={handleCloseAlert} className="bg-red-700 text-white text-lg max-sm:text-base">
                            {error}
                        </Alert>
                    </Snackbar>
                    : null}
                <Box className="bg-white w-full h-full rounded-xl pt-5 pb-5 px-5 shadow-md max-[899px]:pb-3">
                    <Grid container>
                        <Grid item xs={12}>
                            {loading ? (<Skeleton animation="wave" variant="text" className="w-1/5 text-5xl rounded-md" />) : (
                                <Typography className="text-[#303030] font-bold text-xl">
                                    Member Manage
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <form onSubmit={handleSubmit} className="pt-3">
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
                                        <Image
                                            src={previewUrl || image}
                                            alt={username}
                                            width={384}
                                            height={384}
                                            className="rounded-lg object-top object-cover h-auto w-96"
                                        />
                                        <label htmlFor="upload-button">
                                            <Button
                                                variant='contained'
                                                className="bg-[#F0CA83] text-[#303030] font-bold mb-2 hover:bg-[#f3b94d] mt-3"
                                                component="span"
                                                startIcon={<AddAPhotoIcon />}
                                            >
                                                Edit Image
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
                                            value={memberFirstname ? memberFirstname : ""}
                                            fullWidth
                                            name='firstname'
                                            variant='outlined'
                                            className="font-bold rounded pb-3"
                                            onChange={(e) => setMemberFirstname(e.target.value)}
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
                                            value={memberLastname ? memberLastname : ""}
                                            fullWidth
                                            name='lastname'
                                            variant='outlined'
                                            className="font-bold rounded pb-3"
                                            onChange={(e) => setMemberLastname(e.target.value)}
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
                                            type='text'
                                            value={memberEmail ? memberEmail : ""}
                                            fullWidth
                                            name='email'
                                            variant='outlined'
                                            className="font-bold rounded pb-3"
                                            onChange={(e) => setMemberEmail(e.target.value)}
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
                                            value={memberUsername ? memberUsername : ""}
                                            fullWidth
                                            name='username'
                                            variant='outlined'
                                            className="font-bold rounded pb-3"
                                            onChange={(e) => setMemberUsername(e.target.value)}
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
                                            value={memberPassword ? memberPassword : ""}
                                            fullWidth
                                            name='password'
                                            variant='outlined'
                                            className="font-bold rounded pb-3"
                                            onChange={(e) => setMemberPassword(e.target.value)}
                                            inputProps={{ style: { color: "#303030" } }}
                                            sx={{ color: '#303030' }}
                                            required
                                            focused
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Hidden mdDown>
                                        {loading ? (<Skeleton animation="wave" variant="rectangular" sx={{ float: 'right' }} className="w-1/5 justify-end h-10 my-1 rounded-md" />) : (
                                            <ButtonGroup variant="contained" className="gap-1" sx={{ float: 'right' }} aria-label="contained button group">
                                                <Button type='submit' className="bg-[#303030] text-white hover:bg-emerald-600">Update</Button>
                                                {/* <Button type='reset' className="bg-[#303030] text-white hover:bg-red-500">Reset</Button> */}
                                            </ButtonGroup>
                                        )}
                                    </Hidden>
                                    <Hidden mdUp>
                                        {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-10 my-1 rounded-md" />) : (
                                            <ButtonGroup variant="contained" className="gap-1 my-2" fullWidth aria-label="contained button group">
                                                <Button type='submit' className="bg-[#303030] text-white hover:bg-emerald-600">Update</Button>
                                                {/* <Button type='reset' className="bg-[#303030] text-white hover:bg-red-500">Reset</Button> */}
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

export default MemberEdit
