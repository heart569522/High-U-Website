import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const client = await clientPromise;
        const db = client.db("high_u");

        const { email, password } = req.body;

        // Look up the user in the database by their email
        const member = await db.collection("member").findOne({ email });

        if (!member) {
            // User with the given email not found
            res.status(401).json({ message: "Incorrect email." });
            return;
        }

         // Compare the given password with the password stored in the database
         if (member.password !== password) {
            // Passwords don't match
            res.status(401).json({ message: "Incorrect password." });
            return;
        }

        res.status(200).json({ message: "Sign-in successful" });

    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
};
