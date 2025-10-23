import { User } from '../model.js';

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: `User "${deletedUser.name}" deleted successfully`,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error: error.message });
  }
};
