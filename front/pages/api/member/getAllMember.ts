import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const client = await clientPromise;
        const db = client.db("high_u");

        const members = await db.collection("member").find({}).toArray();

        res.status(200).json(members);

    } catch (e: any) {

        console.error(e);
        throw new Error(e).message;

    }
}