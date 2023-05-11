import { ObjectId } from "mongodb";
import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const getFavoriteARImages = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db('high_u');
        const collection = db.collection("ar_capture");

        const memberId = new ObjectId(req.query.member_id as string);

        const favoriteARImages = await collection.find({ member_id: memberId }).toArray();
        res.status(200).json(favoriteARImages);
    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
};

export default getFavoriteARImages;
