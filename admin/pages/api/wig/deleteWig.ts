import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from 'next';

const deleteWig = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const client = await clientPromise;
    const db = client.db("high_u");
    const { id } = req.query;

    const idValue = Array.isArray(id) ? id[0] : id;
    const wig = await db.collection("wig").deleteOne({
      _id: new ObjectId(idValue)
    })

    res.status(200).json(wig);

  } catch (e: any) {
    console.error(e);
    throw new Error(e).message;
  }
}

export default deleteWig;