import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

const addViewWig = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("high_u");
    const collection = db.collection("wig");

    const wigId = new ObjectId(req.body.id as string); // Convert wigId to ObjectId

    const result = await collection.updateOne({ _id: wigId }, { $inc: { view: 1 } });

    if (result.matchedCount === 0) {
      throw new Error(`No wig found with id ${wigId}`);
    }

    res.status(200).json({ message: "View added to wig" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default addViewWig;
