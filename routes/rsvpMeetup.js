import express from 'express';

import meetups from '../models/meetups';

import rsvp from '../models/rsvp';

const router = express.Router();

router.post('/api/v1/meetups/:id/rsvps', (req, res) => {
  res.send('rsvp')
});

export default router;
