import jwt from 'jsonwebtoken';

export default async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) return res.sendStatus(401);

  try {
    const key = process.env.SECRET_KEY;
    res.locals.session = { userId: jwt.verify(token, key) };

    return next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
