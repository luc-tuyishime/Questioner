import express from 'express';

import moment from 'moment';

import meetups from '../models/meetups';

const router = express.Router();

router.get('/api/v1/upcomingMeetup/', (req, res) => {
  const fetch = [];
  const current_date = moment().unix();
  for(let a = 0 ; a < meetups.length ; a ++){
    let happeningOnOrAfter = meetups[a].happeningOn;
        happeningOnOrAfter = new Date(happeningOnOrAfter).getTime();
        happeningOnOrAfter = happeningOnOrAfter/1000;
        if( current_date <= happeningOnOrAfter ){
          fetch.push(meetups[a]);
        }
  }

  if(fetch.length > 0){
    return res.status(200).send({
      status: 200,
      data: fetch
    });
  }
  else {
    return res.status(404).send({
      status: 404,
      error: 'NO UPCOMING MEETUP TO SHOW'
    });
  }



});

export default router;
