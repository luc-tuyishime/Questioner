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

import home from './routes/home';

const app = express();

// get setting of our app

app.use(bodyparser.json());


app.use(express.json());

app.use(logger);
app.use(helmet());

app.use('/', home);
app.use('/api/v1/meetups', upcomingMeetups);
app.use('/api/v1/meetups', meetups); // for any route started with /api/v1 use meetups router
app.use('/api/v1/meetups', questions);
app.use('/api/v1/questions', upvote);
app.use('/api/v1/questions', downvote);
app.use('/api/v1/meetups', rsvp);
app.use('/api/v1/users', users);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('development enabled...');
}

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
