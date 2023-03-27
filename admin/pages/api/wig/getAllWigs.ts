import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const getAllWigs = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const client = await clientPromise;
        const db = client.db("high_u");

        const wigs = await db.collection("wig").find({}).toArray();

        res.status(200).json(wigs);

    } catch (e: any) {

        console.error(e);
        throw new Error(e).message;

    }
}

export default getAllWigs;
