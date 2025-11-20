import { User } from '../model.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const addUser = async (req, res) => {
  try {
    const { name, email, password, role, address, phone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      address,
      phone,
    });

    await newUser.save();

    res.status(201).json({
      message: `${newUser.name} registered successfully`,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: 'Error adding user', error: error.message });
  }
};
