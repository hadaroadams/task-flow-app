import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET_KEY";

export type JwtPayload = {
  email: string;
  role: string;
  expiresIn?: number;
};

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: payload.expiresIn || "1h",
  });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
