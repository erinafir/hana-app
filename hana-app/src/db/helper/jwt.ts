import { sign } from "jsonwebtoken";
import * as jose from "jose";

const SECRET = process.env.JWT_SECRET as string;

export const signToken = (payload: {
  _id: string;
  email: string;
  username: string;
}) => sign(payload, SECRET);

export const verifToken = async <T>(payload: string) => {
  const secretKey = new TextEncoder().encode(SECRET);
  const payloadJose = await jose.jwtVerify<T>(payload, secretKey);
  return payloadJose.payload
};
