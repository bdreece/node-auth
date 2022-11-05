import {createAccessToken, decodeToken} from '../token';
import type {Handler} from '../types';

const refresh: Handler = async (req, res) => {
    const refreshToken = req.cookies['RefreshToken'];
    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            error: 'Missing refresh token!',
        });
    }

    try {
        const id = await decodeToken(refreshToken);
        if (!id) throw 'Malformed refresh token!';
        const accessToken = await createAccessToken(id);
        return res.status(200).json({success: true, data: accessToken});
    } catch (error: any) {
        return res.status(401).json({success: false, error});
    }
};

export default {
    get: refresh,
}
