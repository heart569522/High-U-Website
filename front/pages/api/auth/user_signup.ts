import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import sanitizeHtml from "sanitize-html";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("high_u");
    const {
      image,
      firstname,
      lastname,
      email,
      username,
      password
    } = req.body;

    const sanitizedFirstName = sanitizeHtml(firstname, {
      allowedTags: [],
      allowedAttributes: {}
    });

    const sanitizedLastName = sanitizeHtml(lastname, {
      allowedTags: [],
      allowedAttributes: {}
    });

    const sanitizedEmail = sanitizeHtml(email, {
      allowedTags: [],
      allowedAttributes: {}
    });

    const sanitizedUsername = sanitizeHtml(username, {
      allowedTags: [],
      allowedAttributes: {}
    });

    const sanitizedPassword = sanitizeHtml(password, {
      allowedTags: [],
      allowedAttributes: {}
    });

    const member = await db.collection("member").insertOne({
      image,
      firstname: sanitizedFirstName,
      lastname: sanitizedLastName,
      email: sanitizedEmail,
      username: sanitizedUsername,
      password: sanitizedPassword,
      createdAt: new Date(Date.now()).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    });

    res.status(201).json(member);
    console.log(res);
  } catch (e: any) {
    console.error(e);
    throw new Error(e).message;
  }
};
