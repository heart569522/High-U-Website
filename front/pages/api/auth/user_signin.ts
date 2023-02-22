import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const client = await clientPromise;
        const db = client.db("high_u");

        const { username, password } = req.body;

        // Look up the user in the database by their username
        const user = await db.collection("member").findOne({ username });

        if (!user) {
            // User with the given username not found
            res.status(401).json({ message: "Incorrect username." });
            return;
        }

         // Compare the given password with the password stored in the database
         if (user.password !== password) {
            // Passwords don't match
            res.status(401).json({ message: "Incorrect password." });
            return;
        }

    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
};
