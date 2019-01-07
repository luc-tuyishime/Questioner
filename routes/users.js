import express from 'express';

import users from '../models/users';

const Joi = require('joi');

const router = express.Router();

function validateUser(user) {
  const schema = {
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    othername: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).required(),
    phoneNumber: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    registered: Joi.string().min(3).required(),
    isAdmin: Joi.boolean().required()
  };

  return Joi.validate(user, schema);
}

router.get('/api/v1/users', (req, res) => {
  res.send({
    status: 200,
    data: [users]
  });
});

router.get('/api/v1/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id, 10));
  if (!user) res.status(404).send(`The user with the id ${req.params.id} was not found`);
  res.send(user);
});

router.post('/api/v1/users/', (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  const user = {
    id: users.length + 1,
    createdOn: req.body.moment().format('LL'),
    location: req.body.location,
    images: req.body.images,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags
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
    return res.status(404).send(`The user with the id ${req.params.id} was not found`);
  }
  // validate
  // if invalid, return 400 - bad request
  const { error } = validateUser(req.body);
  if (error) res.status(400).send(error.details[0].message);
  // update user
  // return the update user
  user.createdOn = req.body.moment().format('LL');
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
  if (!user) res.status(404).send(`The user with the id ${req.params.id} was not found`);

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send({
    status: 200,
    data: [user]
  });
});

module.exports = router;
