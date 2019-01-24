// import express from 'express';
//
// import moment from 'moment';
//
// import meetups from '../models/meetups';
//
// const router = express.Router();
//
// router.get('/upcoming', (req, res) => {
//   const fetch = [];
//   const currentDate = moment().unix();
//   for (let a = 0; a < meetups.length; a++) {
//     let happeningOnOrAfter = meetups[a].happeningOn;
//     happeningOnOrAfter = new Date(happeningOnOrAfter).getTime();
//     happeningOnOrAfter /= 1000;
//     if (currentDate <= happeningOnOrAfter) {
//       fetch.push(meetups[a]);
//     }
//   }
//
//   if (fetch.length > 0) {
//     return res.status(200).send({
//       status: 200,
//       data: fetch
//     });
//   }
//
//   return res.status(404).send({
//     status: 404,
//     error: 'NO UPCOMING MEETUP TO SHOW'
//   });
// });
//
// export default router;
