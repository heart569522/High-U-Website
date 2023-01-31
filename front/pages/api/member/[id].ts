import connection from '../connect_db'
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    connection.query(
        'SELECT * FROM `member` WHERE `id` = ?', [id],
        function (err, results) {
            console.log(results); // results contains rows returned by server
            res.status(200).json(results)
        }   
    );
}


