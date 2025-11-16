import { User } from '../users/model.js';
import { Order } from '../orders/model.js';

export const getCustomersWithOrderStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $match: { role: 'customer' } },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'user',
          as: 'orders',
        },
      },
      {
        $addFields: {
          totalOrders: { $size: '$orders' },
          totalSpent: {
            $sum: {
              $map: {
                input: '$orders',
                as: 'o',
                in: '$$o.totalPrice',
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          address: 1,
          phone: 1,
          totalOrders: 1,
          totalSpent: 1,
          createdAt: 1,
        },
      },
      { $sort: { totalSpent: -1 } },
    ]);

    res.status(200).json({
      message: 'Stats retrieved successfully',
      stats,
    });
  } catch (error) {
    console.error('Error fetching customer stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
