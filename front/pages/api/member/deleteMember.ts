import connection from '../connect_db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const result = await connection.query(
      'DELETE FROM member WHERE id = ?',
      [id]
    );
    console.log(result);
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete member' });
  }
};
