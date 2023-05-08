import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const searchWigs = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const searchText = req.query.q as string;

    const client = await clientPromise;
    const db = client.db('high_u');

    const regex = new RegExp(searchText, 'i');

    const wigs = await db.collection('wig').find({
      $or: [
        { title: regex },
        { style: regex },
        { type: regex },
        { color: regex },
        { price: { $eq: parseInt(searchText) } }
      ]
    }).toArray();

    res.status(200).json({ results: wigs });
  } catch (e: any) {
    console.error(e);
    throw new Error(e).message;
  }
}

export default searchWigs;
