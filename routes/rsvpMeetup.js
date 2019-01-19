import express from 'express';

import meetups from '../models/meetups';

import rsvp from '../models/rsvp';

import { validateRsvp } from '../helpers/validation';

const router = express.Router();

router.post('/:id/rsvps', (req, res) => {
  const meetup = meetups.find(m => m.id === parseInt(req.params.id, 10));
  if (!meetup) {
    return res.status(404).send({
      status: 404,
      error: `The meetup with the id ${req.params.id} was not found`
    });
  }
  console.log(parseInt(req.params.id, 10));
  if (!meetup) {
    return res.status(404).send({
      status: 404,
      error: `the meetup with Id ${RsvpMeetup.meetup} is not found`
    });
  }

  const { error } = validateRsvp(req.body);
  if(error){
    return res.status(400).send({
      status: 400,
      error: error.details[0].message
    })
  }

  const RsvpMeetup = {
    id: rsvp.length + 1,
    topic: meetup.topic,
    meetup: parseInt(req.params.id, 10),
    status: req.body.status
  };

  rsvp.push(RsvpMeetup);
  return res.send({
    status: 200,
    data: [RsvpMeetup]
  });
});

export default router;
