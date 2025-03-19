const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin.controller");
const verifyToken = require("../middleware/verfiytoken");

router.route("/").get(verifyToken, controller.allUsers);
router.route("/:id").get(verifyToken, controller.getuser);
router.route("/:id").patch(verifyToken, controller.updateUser);
router.route("/:id").delete(verifyToken, controller.deleteUser);
router.route("/register").post(controller.register);
router.route("/login").post(controller.login);

module.exports = router;