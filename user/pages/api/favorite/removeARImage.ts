import { ObjectId } from "mongodb";
import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const removeARImage = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db('high_u');

        const { id } = req.query;
        const { image } = req.body;

        const member_idValue = Array.isArray(id) ? id[0] : id;

        await db.collection('ar_capture').deleteOne({
            member_id: new ObjectId(member_idValue),
            image: image,
        });

        res.status(200).json({ message: 'AR Image removed successfully' });
    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
};

export default removeARImage;
