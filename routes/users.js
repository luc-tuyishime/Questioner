import express from 'express';
import userDb from "../controllers/users";
import Auth from '../middleware/auth';
const router = express.Router();

router.post("/create", userDb.create);
// router.post("/login", userDb.login);
// router.get("/:id", userController.fetch);
// router.patch("/:id", userController.update);
// router.delete("/:id", Auth.verifyToken, userDb.delete);

module.exports = router;
