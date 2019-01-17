import express from 'express';

import Joi from 'joi';

import moment from 'moment';

import questions from '../models/questions';

const router = express.Router();

function validateMeetup(question) {
  const schema = {
    title: Joi.string().required(),
    body: Joi.string().required()
  };

  return Joi.validate(question, schema);
}

router.get('/api/v1/questions/', (req, res) => {
  res.send({
    status: 200,
    data: [questions]
  });
});

router.post('/api/v1/questions/', (req, res) => {
  const { error } = validateMeetup(req.body);
  if (error) {
    return res.status(400).send({
      status : 400,
      error : error.details[0].message});
  }
  const question = {
    id: parseInt(questions.length + 1, 10),
    meetup: req.body.topic,
    title: req.body.title,
    body: req.body.body,
  };
  questions.push(question);

  return res.send(({
    status: 201,
    data: [question]
  }));
});

export default router;
