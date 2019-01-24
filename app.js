import express from 'express';

import bodyparser from 'body-parser';

import helmet from 'helmet';

import morgan from 'morgan';

import logger from './middleware/logger';

import meetups from './routes/meetups';

import comments from './routes/comments';

import questionsVotes from './routes/questionVotes';

import users from './routes/users';

import home from './routes/home';

const app = express();

app.use(bodyparser.json());

app.use(express.json());

app.use(logger);
app.use(helmet());

app.use('/', home);
app.use('/api/v1/meetups', meetups); // for any route started with /api/v1 use meetups router
app.use('/api/v1/users', users);
app.use('/api/v1/question/', comments);
// app.use('/api/v1/question/', questionsVotes);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('development enabled...');
}

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
