import { ObjectId } from "mongodb";
import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const favoriteWig = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db('high_u');

        const { id } = req.query;
        const { wig_id } = req.body;

        const member_idValue = Array.isArray(id) ? id[0] : id;
        const wig_idValue = Array.isArray(wig_id) ? wig_id[0] : wig_id;

        const existingFavorite = await db.collection('favorite').findOne({
            member_id: new ObjectId(member_idValue),
            wig_id: new ObjectId(wig_idValue),
        });

        if (existingFavorite) {
            // Remove the favorite
            await db.collection('favorite').deleteOne({
                member_id: new ObjectId(member_idValue),
                wig_id: new ObjectId(wig_idValue),
            });

            // Update the favorite count in the wig collection
            await db.collection('wig').updateOne(
                { _id: new ObjectId(wig_idValue) },
                { $inc: { favorite: -1 } }
            );

            res.status(200).json({ message: 'Wig unfavorited' });
        } else {
            // Add a new favorite
            const favorite = await db.collection('favorite').insertOne({
                member_id: new ObjectId(member_idValue),
                wig_id: new ObjectId(wig_idValue),
                created_at: new Date(),
            });

            // Update the favorite count in the wig collection
            await db.collection('wig').updateOne(
                { _id: new ObjectId(wig_idValue) },
                { $inc: { favorite: 1 } }
            );

            res.status(201).json(favorite);
        }
    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
};

export default favoriteWig;
