import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const addAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("high_u");
    const { image, firstname, lastname, email, username, password, role } = req.body;

    const admin = await db.collection("admin").insertOne({
      image,
      firstname,
      lastname,
      email,
      username,
      password,
      role,
      createdAt: new Date(Date.now()).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    });

    res.status(201).json(admin);
    console.log(res)
  } catch (e: any) {
    console.error(e);
    throw new Error(e).message;
  }
};

export default addAdmin