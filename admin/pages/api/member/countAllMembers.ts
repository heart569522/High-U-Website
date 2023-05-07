import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const countAllWigs = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db('high_u');

    const members = await db.collection('member').find({}).toArray();
    const count = members.length;

    res.status(200).json({ count });
  } catch (e: any) {
    console.error(e);
    throw new Error(e).message;
  }
};

export default countAllWigs;
