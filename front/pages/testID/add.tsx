// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
// import {
//   Box,
//   Typography,
//   Toolbar,
//   Grid,
//   Hidden,
//   ButtonGroup,
//   Button,
//   TextField,
//   Skeleton,
//   Snackbar,
//   Alert,
//   AlertTitle
// } from "@mui/material";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

// import DrawerBar from '../../components/Navigation/DrawerBar';
// import Loading from '../../components/Other/Loading';
// import axios from 'axios';

// const drawerWidth = 240;
// const theme = createTheme({
//   typography: {
//     fontFamily: [
//       'Prompt, sans-serif'
//     ].join(','),
//   },
//   palette: {
//     primary: {
//       main: "#303030",
//     },
//     secondary: {
//       main: "#F0CA83"
//     }
//   },
// });


// const add = () => {

//   const [openAlert, setOpenAlert] = useState(false);

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter()

//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const [image, setImage] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg';

//   useEffect(() => {
//     if (!previewUrl) {
//       return;
//     }
//     return () => URL.revokeObjectURL(previewUrl);
//   }, [previewUrl]);

//   const handleImageChange = (e: any) => {
//     const image = e.target.files?.[0];
//     if (!image) {
//       setImage(null);
//       setPreviewUrl(null);
//       return;
//     }
//     setImage(e.target.files ? e.target.files[0] : null);
//     setPreviewUrl(URL.createObjectURL(image));
//   }

//   const handleSubmit = async (e: any) => {
//     e.preventDefault()

//     const formData = new FormData();
//     formData.append('firstname', firstname);
//     formData.append('lastname', lastname);
//     formData.append('email', email);
//     formData.append('username', username);
//     formData.append('password', password);
//     if (image) {
//       // perform actions with the image file
//       formData.append('image', image, image.name);
//     } else {
//       console.error("The image is null");
//     }
//     console.log(firstname, lastname, email, username, password)
//     console.log(image)
//     console.log(formData)

//     try {
//       let response = await axios.post("http://localhost:3000/api/member/addMember", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log(response)
//       handleReset();
//       setMessage("Member Added Successfully!");
//       setOpenAlert(true);
//     } catch (error) {
//       console.error(error);
//       setError("An error occurred while adding the member. Please try again later.");
//       setOpenAlert(true);
//     }
//   }


//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === " ") {
//       e.preventDefault();
//     }
//   };

//   const handleReset = () => {
//     setFirstname("");
//     setLastname("");
//     setEmail("");
//     setUsername("");
//     setPassword("");
//     setImage(null);
//     setPreviewUrl(null);
//     setError("");
//   };

//   const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpenAlert(false);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <DrawerBar />
//       <Box
//         component="main"
//         className="p-5 ml-[240px] max-[899px]:ml-0"
//         sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
//       >
//         <Toolbar />
//         {message ?
//           <Snackbar open={openAlert} autoHideDuration={3000}>
//             <Alert icon={false} onClose={handleCloseAlert} className="bg-green-700 text-white text-lg">
//               {message}
//             </Alert>
//           </Snackbar>
//           : null}
//         {error ?
//           <Snackbar open={openAlert} autoHideDuration={3000}>
//             <Alert icon={false} onClose={handleCloseAlert} className="bg-red-700 text-white text-lg">
//               {error}
//             </Alert>
//           </Snackbar>
//           : null}

//         <Box className="bg-white w-full h-full rounded-xl pt-5 pb-5 px-5 shadow-md max-[899px]:pb-3">
//           <Grid container>
//             <Grid item xs={12}>

//               <Box className='flex gap-3 items-center justify-between'>
//                 <Typography className="text-[#303030] font-bold text-xl">
//                   Add Member
//                 </Typography>

//               </Box>


//             </Grid>
//           </Grid>
//           <form onSubmit={handleSubmit} onReset={handleReset} className="pt-3">
//             <Grid container className="pt-3" spacing={3}>
//               <Grid item xs={12} md={4}>

//                 <center>
//                   <input
//                     accept="image/*"
//                     style={{ display: "none", }}
//                     id="upload-button"
//                     type="file"
//                     onChange={handleImageChange}
//                   />
//                   <img
//                     src={previewUrl || defaultImageUrl}
//                     className="rounded-lg object-top object-cover h-auto w-96"
//                   />
//                   <label htmlFor="upload-button">
//                     <Button
//                       variant='contained'
//                       className="bg-[#F0CA83] text-[#303030] font-bold mb-2 hover:bg-[#f3b94d] mt-3"
//                       component="span"
//                       startIcon={<AddAPhotoIcon />}
//                     >
//                       Add Image
//                     </Button>
//                   </label>
//                 </center>

//               </Grid>
//               <Grid item xs={12} md={8}>
//                 <Grid item xs={12}>
//                   <Typography className="text-[#303030] font-bold pb-2 text-lg">Firstname</Typography>
//                   <TextField
//                     type='text'
//                     value={firstname}
//                     fullWidth
//                     name='firstname'
//                     variant='outlined'
//                     className="font-bold rounded pb-3"
//                     onChange={(e) => setFirstname(e.target.value)}
//                     onKeyDown={handleKeyPress}
//                     inputProps={{ style: { color: "#303030" } }}
//                     sx={{ color: '#303030' }}
//                     required
//                     focused
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography className="text-[#303030] font-bold pb-2 text-lg">Lastname</Typography>
//                   <TextField
//                     type='text'
//                     value={lastname}
//                     fullWidth
//                     name='lastname'
//                     variant='outlined'
//                     className="font-bold rounded pb-3"
//                     onChange={(e) => setLastname(e.target.value)}
//                     onKeyDown={handleKeyPress}
//                     inputProps={{ style: { color: "#303030" } }}
//                     sx={{ color: '#303030' }}
//                     required
//                     focused
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography className="text-[#303030] font-bold pb-2 text-lg">Email</Typography>
//                   <TextField
//                     type="email"
//                     value={email}
//                     fullWidth
//                     name='email'
//                     variant='outlined'
//                     className="font-bold rounded pb-3"
//                     onChange={(e) => setEmail(e.target.value)}
//                     onKeyDown={handleKeyPress}
//                     inputProps={{ style: { color: "#303030" } }}
//                     sx={{ color: '#303030' }}
//                     required
//                     focused
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography className="text-[#303030] font-bold pb-2 text-lg">Username</Typography>
//                   <TextField
//                     type='text'
//                     value={username}
//                     fullWidth
//                     name='username'
//                     variant='outlined'
//                     className="font-bold rounded pb-3"
//                     onChange={(e) => setUsername(e.target.value)}
//                     onKeyDown={handleKeyPress}
//                     inputProps={{ style: { color: "#303030" } }}
//                     sx={{ color: '#303030' }}
//                     required
//                     focused
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography className="text-[#303030] font-bold pb-2 text-lg">Password</Typography>
//                   <TextField
//                     type='text'
//                     value={password}
//                     fullWidth
//                     name='password'
//                     variant='outlined'
//                     className="font-bold rounded pb-3"
//                     onChange={(e) => setPassword(e.target.value)}
//                     onKeyDown={handleKeyPress}
//                     inputProps={{ style: { color: "#303030" } }}
//                     sx={{ color: '#303030' }}
//                     multiline
//                     maxRows={5}
//                     required
//                     focused
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Hidden mdDown>
//                     <ButtonGroup variant="contained" className="gap-1" sx={{ float: 'right' }} aria-label="contained button group">
//                       <Button type='submit' className="bg-[#303030] text-white hover:bg-[#5b5b5b]">OK</Button>
//                       <Button type='reset' className="bg-[#303030] text-white hover:bg-[#5b5b5b]">Reset</Button>
//                     </ButtonGroup>
//                   </Hidden>
//                   <Hidden mdUp>
//                     <ButtonGroup variant="contained" className="gap-1 my-2" fullWidth aria-label="contained button group">
//                       <Button type='submit' className="bg-[#303030] text-white hover:bg-[#5b5b5b]">OK</Button>
//                       <Button type='reset' className="bg-[#303030] text-white hover:bg-[#5b5b5b]">Reset</Button>
//                     </ButtonGroup>
//                   </Hidden>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </form>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   )
// }

// export default add

import clientPromise from "../../lib/mongodb";
import { initializeApp, } from "firebase/app";
import "firebase/storage";

const storage = firebase.storage();

const AddDataMember = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBP6g1wtASve_cXd4vo64BfK0dlo6YF4dk",
      authDomain: "high-u.firebaseapp.com",
      projectId: "high-u",
      storageBucket: "high-u.appspot.com",
      messagingSenderId: "1021090428751",
      appId: "1:1021090428751:web:c31e27e16be8923a21773a",
      measurementId: "G-3KZ8K42CC9"
    };

    initializeApp(firebaseConfig);
  }, []);

  const handleImageChange = event => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!image) {
      setError("Please select an image to upload");
      return;
    }

    try {
      const storageRef = storage().ref();
      const imageRef = storageRef.child(`images/${image.name}`);
      const snapshot = await imageRef.put(image);

      setProgress(100);

      const url = await snapshot.ref.getDownloadURL();

      const dataMember = {
        name: event.target.elements.name.value,
        email: event.target.elements.email.value,
        imageUrl: url,
        createdAt: new Date()
      };

      const client = await connect("mongodb://localhost:27017/highu");
      const dataMembersCollection = client.connection.collection<{
        name: string;
        email: string;
        imageUrl: string;
        createdAt: Date;
      }>("dataMembers");

      await dataMembersCollection.insertOne(dataMember);

      await client.close();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" />
      <input type="email" name="email" placeholder="Email" />
      <input type="file" onChange={handleImageChange} />
      {error && <p>{error}</p>}
      <progress value={progress} max={100} />
      <button type="submit">Add Data Member</button>
    </form>
  );
};

export default AddDataMember;
