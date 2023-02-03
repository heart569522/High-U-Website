import clientPromise from '../../../lib/mongodb';
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const client = await clientPromise;
        const db = client.db("high_u");
        const { id } = req.query;
        const { image, firstname, lastname, email, username, password } = req.body;

        const idValue = Array.isArray(id) ? id[0] : id;
        const member = await db.collection("member").updateOne(
            {
                _id: new ObjectId(idValue)
            },
            {
                $set: {
                    image: image, 
                    firstname: firstname, 
                    lastname: lastname,
                    email: email,
                    username: username,
                    password: password
                }
            }
        )

        res.status(200).json(member);

    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
}