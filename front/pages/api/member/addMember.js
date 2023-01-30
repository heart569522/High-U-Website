import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {
  try {

    const client = await clientPromise;
    const db = client.db("high_u");
    const { image, firstname, lastname, email, username, password } = req.body;

    const member = await db.collection("high_u").insertOne({
        image,
        firstname,
        lastname,
        email,
        username,
        password
    })

    res.json(member);

  } catch(e) {
        console.error(e);
        throw new Error(e).message;
  }
}
