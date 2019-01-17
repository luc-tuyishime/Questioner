import express from 'express';

import moment from 'moment';

import questions from '../models/questions';

import meetups from '../models/meetups';

import { validateQuestion } from '../helpers/validation';

const router = express.Router();

router.get('/:meetupId/questions', (req, res) => {
  res.send({
    status: 200,
    data: [questions]
  });
});

router.post('/:meetupId/questions', (req, res) => {
  const question = {
    id: parseInt(questions.length + 1, 10),
    meetup: req.params.meetupId,
    title: req.body.title,
    body: req.body.body,
    upvote: 0,
    downvote: 0
  };

  const meetup = meetups.find(m => m.id === parseInt(req.params.meetupId, 10));
  if (!meetup) res.status(404).send({
    status: 404,
    error : `The meetup with the id ${req.params.meetupId} was not found`
  });


  const { error } = validateQuestion(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      error: error.details[0].message
    });
  }

  questions.push(question);

  return res.send(({
    status: 200,
    data: [question]
  }));
});

export default router;
