import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

const getOneWig = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("high_u");
        const { id } = req.query;

        if (typeof id !== 'string') {
            res.status(400).json({ message: 'Invalid request' });
            return;
        }

        const wig = await db.collection("wig").findOne({
            _id: new ObjectId(id)
        });

        if (!wig) {
            res.status(404).json({ message: 'Wig not found' });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(wig);

    } catch (e: any) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default getOneWig;
