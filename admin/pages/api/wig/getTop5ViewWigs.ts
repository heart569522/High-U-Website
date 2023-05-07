import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const getTop5ViewWigs = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("high_u");

        const top5ViewedWigs = await db.collection("wig")
            .find({})
            .sort({ view: -1 })
            .limit(5)
            .toArray();

        res.status(200).json(top5ViewedWigs);
    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
}

export default getTop5ViewWigs;
