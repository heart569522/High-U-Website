import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const getTop3FavWigs = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("high_u");

        const top3FavWigs = await db.collection("wig")
            .find({})
            .sort({ favorite: -1 })
            .limit(3)
            .toArray();

        res.status(200).json(top3FavWigs);
    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
}

export default getTop3FavWigs;
