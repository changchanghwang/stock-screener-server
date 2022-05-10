import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';

const userJwtSecret = process.env.JWT_SECRET;

export interface JwtUserEncodeData {
  id: string;
}

export const encodeUserToken = (data: JwtUserEncodeData) => sign(data, userJwtSecret!);

export const decodeUserToken = (token: string) => {
  try {
    return verify(token, userJwtSecret!);
  } catch (e) {
    return null;
  }
};
