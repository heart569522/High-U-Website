import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const addMember = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("high_u");
    const { image, firstname, lastname, email, username, password } = req.body;

    const member = await db.collection("member").insertOne({
      image,
      firstname,
      lastname,
      email,
      username,
      password,
      createdAt: new Date(Date.now()).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    });

    res.status(201).json(member);
    console.log(res)
  } catch (e: any) {
    console.error(e);
    throw new Error(e).message;
  }
};

export default addMember