import { getSession  } from "next-auth/react"
import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const getUserData = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
        res.status(401).json(session);
        return;
    }

    try {
        const client = await clientPromise;
        const db = client.db("high_u");
        const collection = db.collection("member");
        const user = await collection.findOne({ email: session?.user?.email });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export default getUserData