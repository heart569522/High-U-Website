import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const getRoleAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("high_u");

        const roles = await db.collection("admin").distinct("role");

        res.status(200).json(roles);
    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
}

export default getRoleAdmin;