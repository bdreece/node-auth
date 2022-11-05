import {decodeToken} from './token';
import type {Handler, AuthRequest} from './types';

export const authenticate: Handler = async (req: AuthRequest, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer?.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: 'Missing bearer token!',
        });
    }

    const accessToken = bearer.substring('Bearer '.length);
    try {
        const id = await decodeToken(accessToken);
        req.id = id;
        return next();
    } catch (error: any) {
        return res.status(401).json({success: false, error});
    }
}
