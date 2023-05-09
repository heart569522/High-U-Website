import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

const updateAdminPassword = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Admin ID is required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirm password do not match" });
        }

        const client = await clientPromise;
        const db = client.db("high_u");

        const idValue = Array.isArray(id) ? id[0] : id;

        const member = await db.collection("admin").findOne({
            _id: new ObjectId(idValue),
        });

        if (!member) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (member.password !== currentPassword) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        const updateData = {
            password: newPassword,
            updatedAt: new Date(Date.now()).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        const result = await db.collection("admin").updateOne(
            { _id: new ObjectId(idValue) },
            { $set: updateData }
        );

        if (!result.modifiedCount) {
            return res.status(500).json({ message: "Failed to update password" });
        }

        res.status(200).json({ message: "Password updated successfully" });
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default updateAdminPassword;
