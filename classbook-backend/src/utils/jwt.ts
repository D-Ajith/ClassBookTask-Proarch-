// import jwt from 'jsonwebtoken';

// export const generateAccessToken = (payload: object): string => {
//   return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
// };

// export const generateRefreshToken = (payload: object): string => {
//   return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
// };

// export const verifyRefreshToken = (token: string): any => {
//   return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
// };



import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: object): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = (payload: object): string => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
  }
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const verifyRefreshToken = (token: string): any => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
  }
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};