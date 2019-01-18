import express from 'express';

import users from '../models/users';

import  { validateUser }  from '../helpers/validation';

const Joi = require('joi');

const router = express.Router();

router.get('/api/v1/users', (req, res) => {
  res.send({
    status: 200,
    data: [users]
  });
});

router.get('/api/v1/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id, 10));
  if (!user) res.status(404).send({
    status: 404,
    error : `The user with the id ${req.params.id} was not found`
  });
  res.send(user);
});

router.post('/api/v1/users/', (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
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

router.put('/api/v1/users/:id', (req, res) => {
  // Look up the user
  // if not existing, return 404
  const user = users.find(m => m.id === parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).send({
      status: 404,
      error : `The user with the id ${req.params.id} was not found`
    });
  }
  // validate
  // if invalid, return 400 - bad request
  const { error } = validateUser(req.body);
  if (error) res.status(400).send(error.details[0].message);
  // update user
  // return the update user
  user.createdOn = Date.now();
  user.location = req.body.location;
  user.images = req.body.images;
  user.topic = req.body.topic;
  user.happeningOn = req.body.happeningOn;
  user.tags = req.body.tags;
  return res.send({
    status: 200,
    data: [user]
  });
});

router.delete('/api/v1/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id, 10));
  if (!user) res.status(404).send({
    status: 404,
    error : `The user with the id ${req.params.id} was not found`
  });

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send({
    status: 200,
    data: [user]
  });
});

module.exports = router;
