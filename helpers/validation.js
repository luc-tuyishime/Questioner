import Joi from 'joi';

export const validateQuestion = (question) => {
  const schema = {
    title: Joi.string().min(5).required(),
    body: Joi.string().min(5).required()
  };

  return Joi.validate(question, schema);
}

export const validateMeetup = (meetup) => {
  const schema = {
    createdOn: Joi.string().min(3).required(),
    location: Joi.string().min(3).required(),
    topic: Joi.string().min(3).required(),
    happeningOn: Joi.string().min(3).required(),
    tags: Joi.string().allow('').trim().strict()
  };

  return Joi.validate(meetup, schema);
}

export const validateUser = (user) => {
  const schema = {
    firstname: Joi.string().min(5).required(),
    lastname: Joi.string().min(5).required(),
    othername: Joi.string().min(5).required(),
    email: Joi.string().email().min(5).required(),
    phoneNumber: Joi.string().min(5).required(),
    username: Joi.string().min(5).required(),
    registered: Joi.string().min(5).required(),
    isAdmin: Joi.boolean().required()
  };

  return Joi.validate(user, schema);
}

export const validateRsvp = (rsvp) => {
  const schema = {
    status: Joi.string().min(2).required()
  };

  return Joi.validate(rsvp, schema);
}
