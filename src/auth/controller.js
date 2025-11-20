import { sign } from '../JWT/jwt-service.js';

export function login(req, res) {
  const { _id, name, email, role } = req.authenticatedUser;

  const PAYLOAD = {
    _id,
    name,
    email,
    role,
  };

  const token = sign(PAYLOAD);

  res.status(200).json({
    token,        
    user: {       
      _id,
      name,
      email,
      role,
    },
  });
}
