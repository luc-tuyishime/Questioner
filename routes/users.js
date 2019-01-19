import express from 'express';

import users from '../models/users';

import { validateUser } from '../helpers/validation';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    status: 200,
    data: [users]
  });
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id, 10));
  if (!user) {
    res.status(404).send({
      status: 404,
      error: `The user with the id ${req.params.id} was not found`
    });
  }
  res.send(user);
});

router.post('/', (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send({
      status: 400,
      error: error.details[0].message
    });
  }
  const user = {
    id: users.length + 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    othername: req.body.othername,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    username: req.body.username,
    registered: req.body.registered,
    isAdmin: req.body.isAdmin
  };
  users.push(user);
  return res.send({
    status: 201,
    data: [user]
  });
});

router.patch('/:id', (req, res) => {
  // Look up the user
  // if not existing, return 404
  const user = users.find(m => m.id === parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).send({
      status: 404,
      error: `The user with the id ${req.params.id} was not found`
    });
  }
  // validate
  // if invalid, return 400 - bad request
  const { error } = validateUser(req.body);
  if (error) res.status(400).send(error.details[0].message);
  // update user
  // return the update user
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.othername = req.body.othername;
  user.email = req.body.email;
  user.phoneNumber = req.body.phoneNumber;
  user.username = req.body.username;
  user.registered = req.body.registered;
  user.isAdmin = req.body.isAdmin;
  return res.send({
    status: 200,
    data: [user]
  });
});

router.delete('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id, 10));
  if (!user) {
    res.status(404).send({
      status: 404,
      error: `The user with the id ${req.params.id} was not found`
    });
  }

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send({
    status: 200,
    data: [user]
  });
});

module.exports = router;
