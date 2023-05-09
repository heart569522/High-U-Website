export const encryption = {
  secret: process.env.NEXTAUTH_SECRET,
  signingKey: process.env.NEXTAUTH_SIGNING_KEY,
  encryptionKey: process.env.NEXTAUTH_ENCRYPTION_KEY,
};
