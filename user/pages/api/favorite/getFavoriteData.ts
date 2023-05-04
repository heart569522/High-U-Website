import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

const getFavoriteData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("high_u");
    const collection = db.collection("favorite");

    const memberId = new ObjectId(req.query.member_id as string); // Convert memberId to ObjectId

    const favorites = await collection.find({ member_id: memberId }).toArray();

    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default getFavoriteData;