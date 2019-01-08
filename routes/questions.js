import express from 'express';

import Joi from 'joi';

import questions from '../models/questions';

import moment from 'moment';

const router = express.Router();

function validateMeetup(question) {
  const schema = {
    createdOn: Joi.string().min(3).required(),
    createdBy: Joi.number().required(),
    title: Joi.string().required(),
    meetup: Joi.number().required(),
    body: Joi.string().required(),
    votes: Joi.number().min(3).required()
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
     return res.status(400).send(error.details[0].message);
   }
  const question = {
    id: parseInt(questions.length + 1, 10),
    createdOn: moment().format('LL'),
    createdBy: req.body.createdBy,
    title: req.body.title,
    meetup: req.body.topic,
    body: req.body.body,
    votes: req.body.votes
  };
  questions.push(question);

  return res.send(({
    status: 201,
    data: [question]
  }));
});

export default router;
