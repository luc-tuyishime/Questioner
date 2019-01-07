import express from 'express';

import moment from 'moment';

import meetups from '../models/meetups';

const router = express.Router();

moment.suppressDeprecationWarnings = true;

router.get('/api/v1/upcomingMeetup/', (req, res) => {
  const fetch = [];
  for (let i = 0; i < meetups.length; i++) {
    if (moment(meetups[i].happeningOn).isSameOrAfter(moment().format('LL')));
    fetch.push(meetups[i]);
    console.log(meetups[i]);
  }
  if (fetch > 0) {
    return res.status(200).send({
      status: 200,
      data: fetch
    });
  }
  return res.status(404).send({
    status: 404,
    error: 'No meetup to show for upcoming meetups'
  });
});

export default router;
