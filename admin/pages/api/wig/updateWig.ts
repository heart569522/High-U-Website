import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

const updateWig = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const {
            arImage,
            mainImage,
            subImages,
            title,
            style,
            type,
            color,
            size,
            price,
            desc,
        } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Wig ID is required" });
        }

        const client = await clientPromise;
        const db = client.db("high_u");

        const idValue = Array.isArray(id) ? id[0] : id;
        const wig = await db.collection("wig").updateOne(
            {
                _id: new ObjectId(idValue),
            },
            {
                $set: {
                    ar_image: arImage,
                    main_image: mainImage,
                    sub_image: subImages,
                    title: title,
                    style: style,
                    type: type,
                    color: color,
                    size: size,
                    price: price,
                    desc: desc,
                    updatedAt: new Date()
                },
            }
        );

        if (!wig.modifiedCount) {
            return res.status(404).json({ message: "Wig not found" });
        }

        res.status(200).json({ message: "Wig updated successfully" });
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default updateWig;
