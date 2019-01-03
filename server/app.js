const express = require('express');

const logger = require('./middleware/logger');

const app = express();

const helmet = require('helmet');

const morgan = require('morgan');

const config = require('config'); // get setting of our app

const meetups = require('./routes/meetups');

app.use(express.json());

app.use(logger);
app.use(helmet());
app.use('/api/v1/meetups', meetups); // for any route started with /api/v1 use meetups router

console.log(`Application Name: ${config.get('name')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('development enabled...');
}

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
