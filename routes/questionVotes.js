import express from 'express';

import questionsVotes from "../controllers/questionsVotes";

const router = express.Router();

router.patch("/:id/upvote", questionsVotes.upvote);

module.exports = router;
