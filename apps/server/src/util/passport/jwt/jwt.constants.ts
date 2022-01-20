export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'please_replace_your_jwt_secret',
  expiresIn: 36000000, // '10h'
};
