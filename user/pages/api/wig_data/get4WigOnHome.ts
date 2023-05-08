import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const get4WigOnHome = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("high_u");

        const wig = await db.collection("wig")
            .aggregate([{ $sample: { size: 4 } }])
            .toArray();

        res.status(200).json(wig);
    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
}

export default get4WigOnHome;
