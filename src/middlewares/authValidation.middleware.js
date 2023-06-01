import jwt from 'jsonwebtoken';

export default async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');

  if (!authorization) return res.sendStatus(401);

  try {
    const key = process.env.SECRET_KEY;
    const data = jwt.verify(token, key);
    res.locals.sessionUserId = data;
    return next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
