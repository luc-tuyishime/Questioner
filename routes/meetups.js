import express from 'express';

import moment from 'moment';

import meetups from '../models/meetups';

import { validateMeetup } from '../helpers/validation';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    status: 200,
    data: [meetups]
  });
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  const { error } = validateMeetup(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      error: error.details[0].message
    });
  }
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

router.patch('/:id', (req, res) => {
  // Look up the meetup
  // if not existing, return 404
  const meetup = meetups.find(m => m.id === parseInt(req.params.id, 10));
  if (!meetup) {
    res.status(404).send({
      status: 404,
      error: `The meetup with the id ${req.params.id} was not found`
    });
  }

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

router.delete('/:id', (req, res) => {
  const meetup = meetups.find(m => m.id === parseInt(req.params.id, 10));
  if (!meetup) {
    return res.status(404).send({
      status: 404,
      data: `The meetup with the id ${req.params.id} was not found`
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
