import express from 'express';

import questions from '../models/questions';

const router = express.Router();

router.patch('/:id/upvote', (req, res) => {
  const question = questions.find(q => q.id === parseInt(req.params.id, 10));
  if (!question) {
    return res.status(404).send({
      status: 404,
      error: `The question with the id ${req.params.id} was not found`
    });
  }
  question.upvote += 1;
  return res.status(200).send({
    status: 200,
    data: [question]
  });
});

export default router;
