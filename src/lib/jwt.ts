import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET_KEY";

export type JwtPayload = {
  email: string;
  role: string;
  expiresIn?: number;
};

