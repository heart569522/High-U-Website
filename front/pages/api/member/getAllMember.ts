import connection from '../connect_db'
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    connection.query(
        'SELECT * FROM member',
        function (err, results,) {
            console.log(results); // results contains rows returned by server
            res.status(200).json(results)
        }   
    );
}