const express = require('express');

const Joi = require('joi');

const router = express.Router();

const meetups = [
  {
    id: 1,
    createdOn: '10/01/2019',
    location: 'klab',
    images: ['img1.jpg', 'img2.jpg'],
    topic: 'Learn how to code',
    happeningOn: '12/01/2019',
    tags: ['html', 'css', 'Javascript']
  },
  {
    id: 2,
    createdOn: '15/01/2019',
    location: 'Marriot Hotel',
    images: ['img3.jpg', 'img4.jpg'],
    topic: 'Mastering Javascript',
    happeningOn: '19/01/2019',
    tags: ['react', 'angular', 'coffescript']
  },
  {
    id: 3,
    createdOn: '20/01/2019',
    location: 'Serena Hotel',
    images: ['img5.jpg', 'img6.jpg'],
    topic: 'Backend Development',
    happeningOn: '25/01/2019',
    tags: ['golang', 'python', 'Java']
  }
];

function validateMeetup(meetup) {
  const schema = {
    createdOn: Joi.string().min(3).required(),
    location: Joi.string().min(3).required(),
    images: Joi.string().min(3).required(),
    topic: Joi.string().min(3).required(),
    happeningOn: Joi.string().min(3).required(),
    tags: Joi.string().min(3).required()
  };

  return Joi.validate(meetup, schema);
}

router.get('/', (req, res) => {
  res.send(meetups);
});

router.get('/:id', (req, res) => {
  const meetup = meetups.find(m => m.id === parseInt(req.params.id, 10));
  if (!meetup) res.status(404).send(`The meetup with the id ${req.params.id} was not found`);
  res.send(meetup);
});

router.post('/', (req, res) => {
  const { error } = validateMeetup(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  const meetup = {
    id: meetups.length + 1,
    createdOn: req.body.createdOn,
    location: req.body.location,
    images: req.body.images,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags
  };
  meetups.push(meetup);
  res.send(meetup);
});

router.put('/:id', (req, res) => {
  // Look up the meetup
  // if not existing, return 404
  const meetup = meetups.find(m => m.id === parseInt(req.params.id, 10));
  if (!meetup) res.status(404).send(`The meetup with the id ${req.params.id} was not found`);

  // validate
  // if invalid, return 400 - bad request
  const { error } = validateMeetup(req.body);
  if (error) res.status(400).send(error.details[0].message);
  // update meetup
  // return the update course
  meetup.createdOn = req.body.createdOn;
  meetup.location = req.body.location;
  meetup.images = req.body.images;
  meetup.topic = req.body.topic;
  meetup.happeningOn = req.body.happeningOn;
  meetup.tags = req.body.tags;
  res.send(meetup);
});

router.delete('/:id', (req, res) => {
  const meetup = meetups.find(m => m.id === parseInt(req.params.id, 10));
  if (!meetup) res.status(404).send(`The meetup with the id ${req.params.id} was not found`);

  const index = meetups.indexOf(meetup);
  meetups.splice(index, 1);

  res.send(meetup);
});

module.exports = router;
