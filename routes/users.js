import express from 'express';
import userController from "../controllers/users";
const router = express.Router();

router.post("/newUser", userController.create);
router.post("/loginUser", userController.login);
router.get("/fetchAll", userController.fetchAll);
router.get("/:id", userController.fetch);
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
