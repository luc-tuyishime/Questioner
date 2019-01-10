import express from 'express';

import bodyparser from 'body-parser';

import helmet from 'helmet';

import morgan from 'morgan';

import logger from './middleware/logger';

import meetups from './routes/meetups';

import upcomingMeetups from './routes/upcomingMeetups';

import questions from './routes/questions';

import upvote from './routes/upvoteQuestion';

import downvote from './routes/downvoteQuestion';

import rsvp from './routes/rsvpMeetup';

import users from './routes/users';

const app = express();

// get setting of our app

app.use(bodyparser.json());


app.use(express.json());

app.use(logger);
app.use(helmet());
app.use(meetups); // for any route started with /api/v1 use meetups router
app.use(upcomingMeetups);
app.use(questions);
app.use(upvote);
app.use(downvote);
app.use(rsvp);
app.use(users);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('development enabled...');
}

app.use('/', (req, res) => {
  res.send('Welcome to questioner app');
});

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
