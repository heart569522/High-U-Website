import connection from '../connect_db';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { image, firstname, lastname, email, username, password } = req.body;
    connection.query(
        'INSERT INTO member (image, firstname, lastname, email, username, password) VALUES (?, ?, ?, ?, ?, ?)',
        [image, firstname, lastname, email, username, password],
        function (err, result) {
            if (err) {
                res.status(500).json({ message: 'Insertion failed' });
            } else {
                res.status(200).json(result);
            }
        }
    );
}