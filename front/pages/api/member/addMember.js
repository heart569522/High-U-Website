import clientPromise from "../../../lib/mongodb";
import { google } from "googleapis";
import { promisify } from "util";
import fs from "fs";

const readFileAsync = promisify(fs.readFile);

const GOOGLE_API_FOLDER_ID = "1_OliH1E7YX_3q02FvalN4mqeQN8jGqQs";
const clientEmail = "high-u-image@high-u.iam.gserviceaccount.com"; //high-u-image@high-u.iam.gserviceaccount.com
const privateKey =
  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCWt9kqVcAIu4Gc\nnYqNEwWpHw/AQQDcDch+1IfCCYw10EnspCg/FXDF3jpUkxvdlWTR42PF9gV9zlOt\nUwG1KvNpX1FZJNvWeYfbw8rZARfeeD9JLZlT2EX1I4+IUeGWcu7T1cXPmdT7y/28\nL+SgETBL4vHrV09KqYIY+1zT6rf2XKOEQnFmTdebkda1SInI+8tPaW1mQBAy48LO\nZnMHg+vf8/P0dx4mkL9+B9JQHWTo+pMYUSpKBpwijixvc21J11FLD7gfN1JlSD4x\nrfxwvQuHP9Tm0haJgjWU/XxTGEd9JRZuWqSoyggmIRZf+wY9W2APJeWb3ODJrUhv\npCCIovDPAgMBAAECggEAFkcQg3BvVRsaGmMy8o1IPepIcrto/B3Rb+XMN0MgBWhH\nNQJCrKhnpeemKZAhA0ysvVVmDwHBaAoSVkE5tGSn3ABpzspi8D3AdhxnpFHEDG8r\ns45Y5orGNGjQM28e8BUG9irX9Uqgr6NEWwedPIet4tmltoqOPtP1Ven5m51LGc/3\ndbnRNEFa312ELjDr1E8jV4FEo6G6OlSQHxxDu+CDq9KoImOW5EQxQcwRcfFqSfTs\nhLqkguAq9Y0lKU3vRml8lygcvB4vnjFAM12k3TpXk0nhL+nsDL71Vm8oDgdLTdb8\ncy8/oamEgE7Q5wDO4clLe6F3mZ2FzxR4PyEWhp88MQKBgQDP84JK5XLR3warwjmX\nXO0BfOiHyN1zHQw+tiPveeM2LqvyHxBpFLxaIE3LQ+LKrdWrPXq9ilH2Kp34YfhA\nr9yyLmcBWBhZvxda8SVVUtNRy/aSZwbZoQ6qOQ20u0coJb8YD7TCyyQoJe2ou/lq\ntEY4h9yQdunRbBI7a28VT/ikOQKBgQC5ivSpvR8EIb/ZYGKJGo6m+Wojqx4eO75z\new+RADxgsZ28788qnxtrGeEo5pLqewNUo2OeaxFiuAIaJGQWho+yd0/lJsNULtKq\nGandnPFlBA34ln3wfUn4464RnFOjLtn5jjLL/ImRMxdbaSJalpUOBzjBtHjgQaov\nWx4I7gqNRwKBgQCc/tTRQqUK+XwJ1Fqygb+VLf5H9UfrDnUeK1i6BaWaVGYQJ4+2\nJaeFy3mwChKAvfjgjUvLKVBzrv0QdrZ778mI5Ct0AlRv/Srex8xNvHg5+uiu4wVy\n7Hsr3GMSnYk9MDIzMjhgEAm+HdRtXW0SOAQDzd6hWoVwTEz/ez6kMnofUQKBgGLk\nDvcRF6DqJAjF+H6+qt2P/eQ45fqTOTTvmCJej8+xmzMCVdaPqttwlbNpAVD8c4/+\n7a+XvVJyZJxuXPIskhY6xViLSnxp4FpNB15Ysch3WsLt4v30qSKAp1w3h9RnukHq\namSSmvfK1V4hMPA7ZgJuEvAbMnnEReKrm9yCkxktAoGAWeZTLFLakX/xSe3/SlB8\nu5qb8YpcL41GvCZzP4TFsmT7poffzj0Bvv6kmDHuux8LqvpmAdeVBk2oHlgDnDuY\n1kJjrYKPpzQmvMCK86kmPBPFiOPklk02NyxC/RCmiU6AFWa/OHkLC2r8Omabl6pb\nAw1KqdL0ePEr/WyprONzIqM=\n-----END PRIVATE KEY-----\n";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("high_u");
    const { firstname, lastname, email, username, password } = req.body;

    const auth = new google.auth.JWT(clientEmail, null, privateKey, [
      "https://www.googleapis.com/auth/drive",
    ]);

    const drive = google.drive({ version: "v3", auth });

    const image = await readFileAsync(req.file.path);
    const image_base64 = new Buffer(image).toString("base64");
    const fileMetadata = {
      name: `${username}_profile_picture.jpg`,
      parent: [GOOGLE_API_FOLDER_ID],
    };

    const media = {
      mimeType: "image/jpeg",
      body: Buffer.from(image_base64, "base64"),
    };

    const response = drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id",
    });

    const image_url = `https://drive.google.com/drive/uc?id=${response.data.id}`; // https://drive.google.com/drive/folders/1_OliH1E7YX_3q02FvalN4mqeQN8jGqQs?usp=sharing

    const member = await db.collection("member").insertOne({
      image_url,
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
