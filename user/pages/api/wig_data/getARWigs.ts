import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const getARWigs = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const client = await clientPromise;
        const db = client.db("high_u");

        const wigs = await db.collection("wig").find({}).toArray();

        const filteredWigs = wigs.map(wig => ({
            ...wig,
            ar_image: wig.ar_image?.startsWith('http') ? wig.ar_image : null
        }));

        res.status(200).json(filteredWigs);

    } catch (e: any) {

        console.error(e);
        throw new Error(e).message;

    }
}

export default getARWigs;