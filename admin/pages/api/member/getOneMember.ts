import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

const getOneMembers = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("high_u");
        const { id } = req.query;

        if (typeof id !== 'string') {
            res.status(400).json({ message: 'Invalid request' });
            return;
        }

        const member = await db.collection("member").findOne({
            _id: new ObjectId(id)
        });

        if (!member) {
            res.status(404).json({ message: 'Member not found' });
            return;
        }

        res.status(200).json(member);

    } catch (e: any) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default getOneMembers;
