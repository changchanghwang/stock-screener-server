import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';

const userJwtSecret = process.env.JWT_SECRET;

export interface JwtUserEncodeData {
    id: string;
}

export const encodeUserToken = (data: JwtUserEncodeData) =>
    userJwtSecret ? sign(data, userJwtSecret) : sign(data, '??');

export const decodeUserToken = (token: string) => {
    try {
        return userJwtSecret ? verify(token, userJwtSecret) : verify(token, '??');
    } catch (e) {
        return null;
    }
};
