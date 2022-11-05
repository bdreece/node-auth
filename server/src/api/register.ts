import type {Handler} from '../types';
import z from 'zod';
import db from '../db';
import {hashPassword} from '../password';
import {createAccessToken, createRefreshToken} from '../token';


const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
});

const register: Handler<string> = async (req, res) => {
    const result = await schema.safeParseAsync(req.body);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            error: 'Bad request body'
        });
    }

    const {firstName, lastName, email, password} = result.data;

    const hasUser = (await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        }
    }) ?? null) !== null;

    if (hasUser) {
        return res.status(401).json({
            success: false,
            error: 'User already exists!',
        });
    }

    const {hash, salt} = await hashPassword(password);
    await db.user.create({
        data: {
            firstName,
            lastName,
            email,
            hash,
            salt,
        },
    });

    return res.status(200).json({
        success: true,
        data: 'User created',
    });

}

export default {
    post: register
}
