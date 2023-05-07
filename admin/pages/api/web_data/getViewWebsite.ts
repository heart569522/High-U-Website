import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const getViewWebsite = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("high_u");
    const collection = db.collection("web_statistic");

    const groupByDay = await collection.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: "$created_at" },
          visitor_count: { $sum: "$visitor_count" }
        }
      }
    ]).toArray();

    const groupByMonth = await collection.aggregate([
      {
        $group: {
          _id: { $month: "$created_at" },
          visitor_count: { $sum: "$visitor_count" }
        }
      }
    ]).toArray();

    const chartDayData = [
      { day: 'Sun', view: 0 },
      { day: 'Mon', view: 0 },
      { day: 'Tue', view: 0 },
      { day: 'Wed', view: 0 },
      { day: 'Thu', view: 0 },
      { day: 'Fri', view: 0 },
      { day: 'Sat', view: 0 }
    ];

    const chartMonthData = [
      { month: 'Jan', view: 0 },
      { month: 'Feb', view: 0 },
      { month: 'Mar', view: 0 },
      { month: 'Apr', view: 0 },
      { month: 'May', view: 0 },
      { month: 'Jun', view: 0 },
      { month: 'Jul', view: 0 },
      { month: 'Aug', view: 0 },
      { month: 'Sep', view: 0 },
      { month: 'Oct', view: 0 },
      { month: 'Nov', view: 0 },
      { month: 'Dec', view: 0 }
    ];

    groupByDay.forEach((day) => {
      const index = day._id - 1;
      chartDayData[index].view = day.visitor_count;
    });

    groupByMonth.forEach((month) => {
      const index = month._id - 1;
      chartMonthData[index].view = month.visitor_count;
    });

    const countVisitors = await collection.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$visitor_count" },
          totalMonth: {
            $sum: {
              $cond: [{ $eq: [{ $month: "$created_at" }, new Date().getMonth() + 1] }, "$visitor_count", 0]
            }
          },
          totalYear: {
            $sum: {
              $cond: [{ $eq: [{ $year: "$created_at" }, new Date().getFullYear()] }, "$visitor_count", 0]
            }
          },
          totalDay: {
            $sum: {
              $cond: [{ $eq: [{ $dayOfMonth: "$created_at" }, new Date().getDate()] }, "$visitor_count", 0]
            }
          }
        }
      }
    ]).toArray();

    res.status(200).json({
      totalVisitors: countVisitors[0].total,
      totalMonth: countVisitors[0].totalMonth,
      totalYear: countVisitors[0].totalYear,
      totalDay: countVisitors[0].totalDay,
      chartDayData: chartDayData,
      chartMonthData: chartMonthData
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default getViewWebsite;
