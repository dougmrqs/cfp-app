import crypto from "node:crypto";

export const PasswordEncrypter = {
  encrypt: (plainPassword: string) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(plainPassword, salt, 100_000, 64, "sha512").toString("hex");
    return `${salt}.${hash}`;
  },

  compare: (plainPassword: string, passwordHash: string) => {
    const [salt, hash] = passwordHash.split('.');
    const encoded = crypto.pbkdf2Sync(plainPassword, salt, 100_000, 64, "sha512").toString("hex");
    return encoded === hash;
  }
}

