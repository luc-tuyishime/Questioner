import express from 'express';

import moment from 'moment';

import meetupController from "../controllers/meetups";

import commentController from "../controllers/comments";

const router = express.Router();

router.get("/fetchAll", meetupController.fetchAll);
router.get("/Upcoming", meetupController.Upcoming);
router.get("/:meetupId", meetupController.fetchSingle);
router.patch("/:id", meetupController.update);
router.post("/create", meetupController.create);
router.delete("/:id", meetupController.delete);
router.post("/:meetupId/rsvps", meetupController.createRsvp);
router.post("/:id/question", meetupController.createQuestion);


module.exports = router;
