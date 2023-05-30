import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database/database.connection.js';

export async function signUp(req, res) {
  const {
    name, email, photo, password,
  } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const existingUser = await db.query('SELECT * FROM users WHERE email=$1;', [email]);

    if (existingUser.rowCount > 0) {
      return res.status(409)
        .send('Já existe uma conta com esse e-mail');
    }

    await db.query(`
        INSERT INTO users (name, email, photo, password)
        VALUES ($1, $2, $3, $4);
    `, [name, email, photo, passwordHash]);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(422).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.query('SELECT * FROM users WHERE email=$1;', [email]);
    const passwordMatch = user.rows[0].password;

    if (user.rows[0] && bcrypt.compareSync(password, passwordMatch)) {
      const existingSession = await db.query('SELECT * FROM sessions WHERE "userId"=$1;', [user.rows[0].id]);

      if (existingSession.rowCount > 0) {
        return res.status(400).send('Usuário já logado');
      }

      await db.query(`
            INSERT INTO sessions ("userId")
            VALUES ($1);`, [user.rows[0].id]);

      const key = process.env.SECRET_KEY;
      const session = await db.query('SELECT * FROM sessions WHERE "userId"=$1', [user.rows[0].id]);
      const token = jwt.sign(session.rows[0].userId, key);

      return res.status(200).send({ token });
    }
    return res.status(401).send('E-mail ou senha incorretos');
  } catch (err) {
    return res.status(422).send(err.message);
  }
}

export async function logOut(req, res) {
  const { sessionUserId } = res.locals;
  try {
    const deletedSession = await db.query('DELETE FROM sessions WHERE "userId"=$1;', [sessionUserId]);
    if (deletedSession.rowCount === 0) return res.sendStatus(400);
    return res.status(200).send(deletedSession);
  } catch (err) {
    return res.status(422).send(err.message);
  }
}
