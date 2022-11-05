import type {Handler} from '../types';
import z from 'zod';

import db from '../db';
import {verifyPassword} from '../password';
import {createAccessToken, createRefreshToken} from '../token';

const schema = z.object({
    email: z.string(),
    password: z.string(),
});

type Response = {
    accessToken: string;
}

const login: Handler<Response> = async (req, res) => {
    const result = await schema.safeParseAsync(req.body);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            error: 'Bad request body!',
        });
    }

    const {email, password} = result.data;

    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            hash: true,
            salt: true,
        }
    });

    if (!user || !await verifyPassword(password, user.hash, user.salt)) {
        return res.status(401).json({
            success: false,
            error: 'Bad credentials',
        });
    }

    const [accessToken, refreshToken] = await Promise.all([
        createAccessToken(user.id.toString()),
        createRefreshToken(user.id.toString()),
    ]);

    return res.status(200)
        .setHeader('Set-Cookie', `RefreshToken=${refreshToken}; Path=/; HttpOnly`)
        .json({
            success: true,
            data: {
                accessToken
            }
        });
};

export default {
    post: login,
}
