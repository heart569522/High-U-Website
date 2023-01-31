import connection from '../connect_db'
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { firstname, lastname, email, username, password } = req.body;

    try {
        const result = await connection.query(
            'UPDATE member SET firstname = ?, lastname = ?, email = ?, username = ?, password = ? WHERE id = ?',
            [firstname, lastname, email, username, password, id]
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Update member failed', error });
    }
}