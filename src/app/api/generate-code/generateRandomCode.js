const crypto = require("crypto");

export default function generateRandomCode() {
  return crypto.randomBytes(6).toString("hex").toUpperCase();
}
