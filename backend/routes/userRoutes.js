const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

// Protected route
router.get("/profile", userController.verifyToken, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

module.exports = router;