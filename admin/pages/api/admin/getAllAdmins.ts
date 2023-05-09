import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const getAllAdmins = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const client = await clientPromise;
        const db = client.db("high_u");

        const admins = await db.collection("admin").find({}).toArray();

        res.status(200).json(admins);

    } catch (e: any) {

        console.error(e);
        throw new Error(e).message;

    }
}

export default getAllAdmins;
