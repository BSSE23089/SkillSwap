// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// Example of a protected route using verifyToken middleware
router.get("/profile", userController.verifyToken, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

module.exports = router;
