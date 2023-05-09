import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const addViewWebsite = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db('high_u');
    const collection = db.collection('web_statistic');

    // Get today's date.
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    todayEnd.setMilliseconds(todayEnd.getMilliseconds() - 1);


    // Try to find a document for today.
    const existingDoc = await collection.findOne({ created_at: { $gte: todayStart, $lt: todayEnd } });

    // If a document was found, update it with a new visitor count.
    if (existingDoc) {
      await collection.updateOne(
        { created_at: { $gte: todayStart, $lt: todayEnd } },
        { $inc: { visitor_count: 1 } }
      );
      return res.status(200).json({ message: 'Updated website view' });
    }

    // If no document was found, create a new one with visitor_count = 1.
    await collection.insertOne({
      created_at: today,
      visitor_count: 1,
    });

    res.status(200).json({ message: 'Added website view' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default addViewWebsite;
