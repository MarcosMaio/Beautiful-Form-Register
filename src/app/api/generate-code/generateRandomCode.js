const crypto = require("crypto");

export default function generateRandomCode() {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}
