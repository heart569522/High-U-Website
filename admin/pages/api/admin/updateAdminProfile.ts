import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

const updateAdminProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const { image, firstname, lastname, username } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Admin ID is required" });
    }

    const client = await clientPromise;
    const db = client.db("high_u");

    const idValue = Array.isArray(id) ? id[0] : id;
    const updateData: any = {};

    if (image !== undefined) {
      updateData.image = image;
    }

    if (firstname !== undefined && firstname !== "") {
      updateData.firstname = firstname;
    }

    if (lastname !== undefined && lastname !== "") {
      updateData.lastname = lastname;
    }

    if (username !== undefined && username !== "") {
      updateData.username = username;
    }

    updateData.updatedAt = new Date(Date.now()).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const admin = await db.collection("admin").updateOne(
      {
        _id: new ObjectId(idValue),
      },
      {
        $set: updateData,
      }
    );

    if (!admin.modifiedCount) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated successfully" });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};


export default updateAdminProfile;
