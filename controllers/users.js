import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../config/database';
import Helper from '../controllers/helper';

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async create(req, res) {
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.isAdmin || !req.body.othername) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(username,email,password,firstname,lastname,isadmin,othername)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
      const newUser = [
        req.body.username,
        req.body.email,
        hashPassword,
        req.body.firstname,
        req.body.lastname,
        req.body.isAdmin,
        req.body.othername
      ];

    try {
      const { rows } = await db.query(createQuery, newUser);
      const token = Helper.generateToken({id: rows[0].id});
      return res.status(201).send({ token });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  },
  /**
   * Login
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async login(req, res) {
      const hashPassword = Helper.hashPassword(req.body.password);
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({'message': 'The credentials you provided is incorrect'});
      }
      if(!Helper.comparePassword(rows[0].password, hashPassword)) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({ token });
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Delete A User
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default User;
