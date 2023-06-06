import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js';

async function signUp(req, res) {
  const {
    name, email, photo, password,
  } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const existingUser = await userRepository.findUser(email);

    if (existingUser) {
      return res.status(409)
        .send('Já existe uma conta com esse e-mail');
    }

    await userRepository.createUser(name, email, photo, passwordHash);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(422).send(err.message);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findUser(email);

    if (!user) return res.status(401).send('Não existe uma conta com esse e-mail');

    const passwordMatch = user.password;

    if (user && bcrypt.compareSync(password, passwordMatch)) {
      const existingSession = await userRepository.findSession(user.id);

      if (existingSession) return res.status(400).send('Usuário já logado');

      await userRepository.createSession(user.id);

      const key = process.env.SECRET_KEY;
      const token = jwt.sign(user.id, key);

      return res.status(200).send({ token, user });
    }
    return res.status(401).send('E-mail ou senha incorretos');
  } catch (err) {
    return res.status(422).send(err.message);
  }
}

async function logOut(req, res) {
  const { userId } = res.locals.session;

  try {
    await userRepository.deleteSession(userId);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(422).send(err.message);
  }
}

async function followUser(req, res) {
  const { userId } = res.locals.session;
  const followingId = userId;
  const { followerId } = req.params;

  try {
    await userRepository.followUser(followingId, followerId);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(422).send(err.message);
  }
}

async function unfollowUser(req, res) {
  const { userId } = res.locals.session;
  const unfollowingId = userId;
  const { unfollowerId } = req.params;

  try {
    await userRepository.unfollowUser(unfollowingId, unfollowerId);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(422).send(err.message);
  }
}

const userControllers = {
  signUp,
  signIn,
  logOut,
  followUser,
  unfollowUser,
};

export default userControllers;
