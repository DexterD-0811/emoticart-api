import { User } from '../model.js';

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: `User "${updatedUser.name}" updated successfully`,
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
};
