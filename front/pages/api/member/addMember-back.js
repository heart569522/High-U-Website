// import clientPromise from "../../../lib/mongodb";

// export default async (req, res) => {
//   try {
//     const client = await clientPromise;
//     const db = client.db("high_u");
//     const { image, firstname, lastname, email, username, password } = req.body;

//     const member = await db.collection("member").insertOne({
//       image,
//       firstname,
//       lastname,
//       email,
//       username,
//       password,
//     });

//     res.json(member);
//   } catch (e) {
//     console.error(e);
//     throw new Error(e).message;
//   }
// };

// add to one-drive
// import clientPromise from "../../../lib/mongodb";
// import axios from "axios";
// import fs from "fs";
// import { promisify } from "util";

// const readFileAsync = promisify(fs.readFile);

// const accessToken = "YOUR_ACCESS_TOKEN";

// export default async (req, res) => {
//   try {
//     const client = await clientPromise;
//     const db = client.db("high_u");
//     const { firstname, lastname, email, username, password } = req.body;

//     const image = await readFileAsync(req.file.path);
//     const image_base64 = new Buffer(image).toString("base64");
//     const fileMetadata = {
//       "@microsoft.graph.conflictBehavior": "rename",
//       name: `${username}_profile_picture.jpg`,
//     };

//     const response = await axios.put(
//       `https://graph.microsoft.com/v1.0/me/drive/root:/${username}_profile_picture.jpg:/content`,
//       image_base64,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "image/jpeg",
//         },
//         params: {
//           "@microsoft.graph.conflictBehavior": "rename",
//         },
//       }
//     );

//     const image_url = response.data["@microsoft.graph.downloadUrl"];

//     const member = await db.collection("member").insertOne({
//       image_url,
//       firstname,
//       lastname,
//       email,
//       username,
//       password,
//     });

//     res.json(member);
//   } catch (e) {
//     console.error(e);
//     throw new Error(e).message;
//   }
// };

// add to google
import { google } from "googleapis";
import clientPromise from "../../../lib/mongodb";

const GOOGLE_API_FOLDER_ID = "1_OliH1E7YX_3q02FvalN4mqeQN8jGqQs";
const clientEmail = "high-u-image@high-u.iam.gserviceaccount.com";
const privateKey =
  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCWt9kqVcAIu4Gc\nnYqNEwWpHw/AQQDcDch+1IfCCYw10EnspCg/FXDF3jpUkxvdlWTR42PF9gV9zlOt\nUwG1KvNpX1FZJNvWeYfbw8rZARfeeD9JLZlT2EX1I4+IUeGWcu7T1cXPmdT7y/28\nL+SgETBL4vHrV09KqYIY+1zT6rf2XKOEQnFmTdebkda1SInI+8tPaW1mQBAy48LO\nZnMHg+vf8/P0dx4mkL9+B9JQHWTo+pMYUSpKBpwijixvc21J11FLD7gfN1JlSD4x\nrfxwvQuHP9Tm0haJgjWU/XxTGEd9JRZuWqSoyggmIRZf+wY9W2APJeWb3ODJrUhv\npCCIovDPAgMBAAECggEAFkcQg3BvVRsaGmMy8o1IPepIcrto/B3Rb+XMN0MgBWhH\nNQJCrKhnpeemKZAhA0ysvVVmDwHBaAoSVkE5tGSn3ABpzspi8D3AdhxnpFHEDG8r\ns45Y5orGNGjQM28e8BUG9irX9Uqgr6NEWwedPIet4tmltoqOPtP1Ven5m51LGc/3\ndbnRNEFa312ELjDr1E8jV4FEo6G6OlSQHxxDu+CDq9KoImOW5EQxQcwRcfFqSfTs\nhLqkguAq9Y0lKU3vRml8lygcvB4vnjFAM12k3TpXk0nhL+nsDL71Vm8oDgdLTdb8\ncy8/oamEgE7Q5wDO4clLe6F3mZ2FzxR4PyEWhp88MQKBgQDP84JK5XLR3warwjmX\nXO0BfOiHyN1zHQw+tiPveeM2LqvyHxBpFLxaIE3LQ+LKrdWrPXq9ilH2Kp34YfhA\nr9yyLmcBWBhZvxda8SVVUtNRy/aSZwbZoQ6qOQ20u0coJb8YD7TCyyQoJe2ou/lq\ntEY4h9yQdunRbBI7a28VT/ikOQKBgQC5ivSpvR8EIb/ZYGKJGo6m+Wojqx4eO75z\new+RADxgsZ28788qnxtrGeEo5pLqewNUo2OeaxFiuAIaJGQWho+yd0/lJsNULtKq\nGandnPFlBA34ln3wfUn4464RnFOjLtn5jjLL/ImRMxdbaSJalpUOBzjBtHjgQaov\nWx4I7gqNRwKBgQCc/tTRQqUK+XwJ1Fqygb+VLf5H9UfrDnUeK1i6BaWaVGYQJ4+2\nJaeFy3mwChKAvfjgjUvLKVBzrv0QdrZ778mI5Ct0AlRv/Srex8xNvHg5+uiu4wVy\n7Hsr3GMSnYk9MDIzMjhgEAm+HdRtXW0SOAQDzd6hWoVwTEz/ez6kMnofUQKBgGLk\nDvcRF6DqJAjF+H6+qt2P/eQ45fqTOTTvmCJej8+xmzMCVdaPqttwlbNpAVD8c4/+\n7a+XvVJyZJxuXPIskhY6xViLSnxp4FpNB15Ysch3WsLt4v30qSKAp1w3h9RnukHq\namSSmvfK1V4hMPA7ZgJuEvAbMnnEReKrm9yCkxktAoGAWeZTLFLakX/xSe3/SlB8\nu5qb8YpcL41GvCZzP4TFsmT7poffzj0Bvv6kmDHuux8LqvpmAdeVBk2oHlgDnDuY\n1kJjrYKPpzQmvMCK86kmPBPFiOPklk02NyxC/RCmiU6AFWa/OHkLC2r8Omabl6pb\nAw1KqdL0ePEr/WyprONzIqM=\n-----END PRIVATE KEY-----\n";

const drive = google.drive({
  version: "v3",
  auth: new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive"],
  }),
});

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("high_u");
    console.log("req.body:", req.body);
    const { image, firstname, lastname, email, username, password } = req.body;

    // Upload the image to Google Drive
    const fileMetadata = {
      name: `${firstname}-${lastname}-${Date.now()}.jpg`,
      parent: [GOOGLE_API_FOLDER_ID],
    };
    const media = {
      mimeType: "image/jpg",
      body: image,
    };
    const uploadedFile = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    // Save the link to the image in the MongoDB database
    const link = `https://drive.google.com/u/0/uc?id=${uploadedFile.data.id}`;
    const member = await db.collection("member").insertOne({
      image: link,
      firstname,
      lastname,
      email,
      username,
      password,
    });

    res.json(member);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};

