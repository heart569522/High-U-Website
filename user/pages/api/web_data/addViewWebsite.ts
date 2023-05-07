import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const addViewWebsite = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db('high_u');
    const collection = db.collection('web_statistic');

    // Increment the visitor_count field for the current day, or create a new document if none exists.
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const existingDoc = await collection.findOneAndUpdate(
      { created_at: { $gte: todayStart, $lt: todayEnd } },
      { $inc: { visitor_count: 1 } },
      { upsert: true }
    );

    // If a document was found and updated, return a success message.
    if (existingDoc.value) {
      return res.status(200).json({ message: 'Added website view' });
    }

    // If no document was found, create a new one with visitor_count = 1.
    await collection.insertOne({
      created_at: new Date(),
      visitor_count: 1,
    });

    res.status(200).json({ message: 'Added website view' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default addViewWebsite;
