import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const client = await clientPromise;
        const db = client.db("high_u");
        const { 
            image, 
            firstname, 
            lastname, 
            email, 
            username, 
            password 
        } = req.body;

        const member = await db.collection("member").insertOne({
            image, 
            firstname, 
            lastname, 
            email, 
            username, 
            password
        })

        res.json(member);

    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
}