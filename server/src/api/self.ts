import type {Handler, AuthRequest} from '../types';

import db from '../db';

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const self: Handler<User> = async (req: AuthRequest, res) => {
    if (!req.id) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized!',
        });
    }

    console.log({id: req.id});

    const user: User | null = await db.user.findUnique({
        where: {
            id: parseInt(req.id)
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        }
    })

    if (!user) {
        return res.status(404).json({
            success: false,
            error: 'User not found!',
        });
    }

    return res.status(200).json({
        success: true,
        data: user
    });
}

export default {
    get: self,
}
