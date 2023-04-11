import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const addWig = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("high_u");
    const {
      arImage,
      mainImage,
      subImages,
      title,
      style,
      type,
      color,
      size,
      price,
      desc,
    } = req.body;

    const wig = await db.collection("wig").insertOne({
      ar_image: arImage,
      main_image: mainImage,
      sub_image: subImages,
      title,
      style,
      type,
      color,
      size,
      price,
      desc,
      view: 0,
      favorite: 0,
      use: 0,
      createdAt: new Date(Date.now()).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    });

    res.status(201).json(wig);
  } catch (e: any) {
    console.error(e);
    throw new Error(e).message;
  }
};

export default addWig;