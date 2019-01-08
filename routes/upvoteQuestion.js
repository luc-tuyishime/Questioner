import express from 'express';

import Joi from 'joi';

import questions from '../models/questions';

import moment from 'moment';

const router = express.Router();

router.patch('/api/v1/questions/:id/upvote', (req, res) => {
    const question = questions.find(q => q.id === parseInt(req.params.id));
    question.votes = question.votes + 1
    res.status(200).send({
      status: 200,
      data: [question]
    });
});

export default router;
