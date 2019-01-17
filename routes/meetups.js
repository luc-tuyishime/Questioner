import express from 'express';

import Joi from 'joi';

import moment from 'moment';

import meetups from '../models/meetups';

const router = express.Router();

function validateMeetup(meetup) {
  const schema = {
    createdOn: Joi.string().min(3).required(),
    location: Joi.string().min(3).required(),
    topic: Joi.string().min(3).required(),
    happeningOn: Joi.string().min(3).required(),
    tags: Joi.string().allow('').trim().strict()
  };

  return Joi.validate(meetup, schema);
}

router.get('/api/v1/meetups', (req, res) => {
  res.send({
    status: 200,
    data: [meetups]
  });
});

router.get('/api/v1/meetups/:id', (req, res) => {
  const meetup = meetups.find(m => m.id === parseInt(req.params.id, 10));
  if (!meetup) {
    return res.status(404).send({
      status: 404,
      error: `The meetup with the id ${req.params.id} was not found`
    });
  }
  return res.send({
    status: 200,
    data: [meetup]
  });
});

router.post('/api/v1/meetups', (req, res) => {
  //  const { error } = validateMeetup(req.body);
  //  if (error) {
  //    return res.status(400).send({
  //      status: 400,
  //      error : error.details[0].message
  //  });
  // }
  const meetup = {
    id: parseInt(meetups.length + 1, 10),
    createdOn: moment().format('LL'),
    location: req.body.location,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags
  };
  meetups.push(meetup);

  return res.send(({
    status: 201,
    data: [meetup]
  }));
});

router.patch('/api/v1/meetups/:id', (req, res) => {
  // Look up the meetup
  // if not existing, return 404
  const meetup = meetups.find(m => m.id === parseInt(req.params.id, 10));
  if (!meetup) res.status(404).send({
    status: 404,
    error : `The meetup with the id ${req.params.id} was not found`
  });

  // validate
  // if invalid, return 400 - bad request
  const { error } = validateMeetup(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      error: error.details[0].message
    });
  }
  // update meetup
  // return the update course
  meetup.createdOn = moment().format('LL');
  meetup.location = req.body.location;
  meetup.topic = req.body.topic;
  meetup.happeningOn = req.body.happeningOn;
  meetup.tags = req.body.tags;
  return res.send({
    status: 200,
    data: [meetup]
  });
});

router.delete('/api/v1/meetups/:id', (req, res) => {
  const meetup = meetups.find(m => m.id === parseInt(req.params.id, 10));
  if (!meetup) {
    return res.status(404).send({
      status: 404,
      data : `The meetup with the id ${req.params.id} was not found`
    });
  }
  const index = meetups.indexOf(meetup);
  meetups.splice(index, 1);

  return res.send({
    status: 200,
    data: [meetup]
  });
});

export default router;
