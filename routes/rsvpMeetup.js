import express from 'express';

import meetups from '../models/meetups';

import rsvp from '../models/rsvp';

const router = express.Router();

router.post('/api/v1/meetups/:id/rsvps', (req, res) => {
  const RsvpMeetup = {
    id: rsvp.length + 1,
    topic: req.body.topic,
    meetup: parseInt(req.params.id, 10),
    status: req.body.status
  };
  const meetup = meetups.find(m => m.id === parseInt(req.params.id, 10));
  console.log(parseInt(req.params.id, 10));
  if (!meetup) {
    return res.status(404).send({
      status: 404,
      error: `the meetup with Id ${RsvpMeetup.meetup} is not found`
    });
  }
  rsvp.push(RsvpMeetup);
  return res.send({
    status: 200,
    data: [RsvpMeetup]
  });
});

export default router;
