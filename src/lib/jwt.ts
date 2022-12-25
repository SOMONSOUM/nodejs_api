import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const generateAccessToken = (username?: string, user_id?: number) => {
  return jwt.sign({ username, user_id }, process.env.TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
    return res
      .status(401)
      .json({ message: 'No credentials or Ivalid credentials' });

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log(err);

      if (err) return res.status(403).json({ message: 'Unauthorize' });

      req.user = user;

      next();
    }
  );
};
