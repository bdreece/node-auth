import crypto from 'crypto';

const DIGEST = 'sha256';
const ENCODING = 'base64';
const ITERATIONS = 10000;
const KEY_LENGTH = 128;

export type Hash = {
    hash: string;
    salt: string;
}

export const hashPassword = (password: string): Promise<Hash> => new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(KEY_LENGTH).toString(ENCODING);
    crypto.pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, DIGEST, (error, hash) => {
        if (error) reject(error);
        else resolve({
            hash: hash.toString(ENCODING),
            salt
        });
    })
});

export const verifyPassword = (password: string, hash: string, salt: string): Promise<boolean> =>
    new Promise((resolve, reject) =>
        crypto.pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, DIGEST, (error, hashAttempt) => {
            if (error) reject(error);
            else resolve(hash === hashAttempt.toString(ENCODING));
        }));
