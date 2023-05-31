import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

const checkEmailExist = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("high_u");
    const collection = db.collection("member");
    const user = await collection.findOne({ email });

    const emailExists = !!user;

    res.status(200).json({ emailExists });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export default checkEmailExist;
