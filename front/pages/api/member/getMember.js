import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    try {

        const client = await clientPromise;
        const db = client.db("high_u");

        const member = await db.collection("member").find({}).toArray();

        res.json(member);

    } catch(e) {

        console.error(e);
        throw new Error(e).message;

    }
}