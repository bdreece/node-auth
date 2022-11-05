import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || 'mysuperdupersecretsecret';

const createToken = (sub: string, expiresIn: number): Promise<string> =>
    new Promise((resolve, reject) =>
        jwt.sign({sub}, SECRET, {expiresIn}, (error, token) => {
            if (error) reject(error);
            else resolve(token);
        }));

export const decodeToken = (token: string): Promise<string> =>
    new Promise((resolve, reject) =>
        jwt.verify(token, SECRET, {}, (error, decoded) => {
            if (error) reject(error);
            else resolve(decoded.toString());
        }));

export const createAccessToken = (sub: string) => createToken(sub, 60 * 60); // 1 hr
export const createRefreshToken = (sub: string) => createToken(sub, 60 * 60 * 24 * 7 * 52); // 1 yr

