import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    token?: string;
    message: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { userName, password } = req.body;
    if (userName !== 'admin' || password !== 'admin') {
        return res
            .status(401)
            .json({ message: 'Username and password both must be admin.' });
    }
    res
        .status(200)
        .json({ token: 'SECRET_TOKEN', message: 'Successfully logged in.' });
}
