import { createCipheriv, randomBytes } from "crypto";

export const encryption = {
  secret: process.env.NEXTAUTH_SECRET,
  signingKey: process.env.NEXTAUTH_SIGNING_KEY,
  encryptionKey: process.env.NEXTAUTH_ENCRYPTION_KEY,
};

export async function encrypt(text) {
  const iv = randomBytes(16);
  const truncatedEncryptionKey = Buffer.from(encryption.encryptionKey, "hex").slice(0, 32);
  const cipher = createCipheriv("aes-256-cbc", truncatedEncryptionKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}