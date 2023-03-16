import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

const updateUserProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const { image, firstname, lastname, username } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Member ID is required" });
    }

    const client = await clientPromise;
    const db = client.db("high_u");

    const idValue = Array.isArray(id) ? id[0] : id;
    const member = await db.collection("member").updateOne(
      {
        _id: new ObjectId(idValue),
      },
      {
        $set: {
          image: image,
          firstname: firstname,
          lastname: lastname,
          username: username,
          updatedAt: new Date(Date.now()).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      }
    );

    if (!member.modifiedCount) {
      return res.status(404).json({ message: "Member not found" });
    }
    
    res.status(200).json({ message: "Member updated successfully" });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default updateUserProfile;
