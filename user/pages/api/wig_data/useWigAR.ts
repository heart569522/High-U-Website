import { ObjectId } from "mongodb";
import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const useWigAR = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db('high_u');

        const { id } = req.query;
        const { use } = req.body;

        const wig_idValue = Array.isArray(id) ? id[0] : id;

        // Update the wig use count in the wig collection
        await db.collection('wig').updateOne(
            { _id: new ObjectId(wig_idValue) },
            { $inc: { use: use } }
        );

        res.status(200).json({ message: 'Wig use count updated' });

    } catch (e: any) {
        console.error(e);
        res.status(500).json({ message: 'Server error' });
        throw new Error(e).message;
    }
};

export default useWigAR;
