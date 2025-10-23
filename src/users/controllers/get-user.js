import { User } from '../model.js';

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('+password'); // optional if you want password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User retrieved successfully',
      user,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error: error.message });
  }
};
