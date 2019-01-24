import express from 'express';

import commentController from "../controllers/comments";

const router = express.Router();

router.post("/:id/comment", commentController.postComment);
router.get("/:id/comment", commentController.getComment);

module.exports = router;
