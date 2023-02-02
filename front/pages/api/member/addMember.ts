import clientPromise from "../../../lib/mongodb";
import multer from 'multer';
import { storageFirebase } from '../firebaseConfig';
import { ref, } from 'firebase/storage'

const upload = multer();

export default async (req: { body: { firstname: any; lastname: any; email: any; username: any; password: any; }; files: { image: any; }; }, res: { json: (arg0: { imageUrl: any; }) => void; }) => {
  try {
    const client = await clientPromise;
    const db = client.db("high_u");
    const { firstname, lastname, email, username, password } = req.body;
    const image = req.files.image;

    // Upload image to Firebase Storage
    const fileName = `member_images/${username}_${Date.now()}_${image.name}`;
    const fileRef = storageFirebase.ref().child(fileName);
    const uploadTask = fileRef.put(image);

    uploadTask.on(
      "state_changed",
      (snapshot: { bytesTransferred: number; totalBytes: number; state: any; }) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error: string | undefined) => {
        console.error(error);
        throw new Error(error).message;
      },
      async () => {
        // Handle successful uploads on complete
        const imageUrl = await fileRef.getDownloadURL();
        console.log(`Image has been uploaded with URL: ${imageUrl}`);

        // Save image URL to MongoDB
        db.collection("member").insertOne({
          image: imageUrl,
          firstname,
          lastname,
          email,
          username,
          password,
        });

        res.json({ imageUrl });
      }
    );
  } catch (e: any) {
    console.error(e);
    throw new Error(e).message;
  }
};