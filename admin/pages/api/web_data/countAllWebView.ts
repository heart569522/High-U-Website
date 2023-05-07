import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const countAllWebView = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db('high_u');
    const collection = db.collection('web_statistic');

    const countVisitors = await collection.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$visitor_count" }
        }
      }
    ]).toArray();

    res.status(200).json({
      totalVisitors: countVisitors[0].total
    });
  } catch (e: any) {
    console.error(e);
    throw new Error(e).message;
  }
};

export default countAllWebView;
