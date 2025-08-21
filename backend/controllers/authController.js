const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// User Signup
// =========================
exports.signup = async (req, res) => {
  try {
    const { name, email, password, bio, location, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email already registered" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      passwordHash, // ✅ store hashed password
      bio,
      location,
      role,
    });

    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ Consistent response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// =========================
// User Login
// =========================
// =========================
// User Login
// =========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email or password" });
    }

    // ✅ Compare against passwordHash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email or password" });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Store token in HttpOnly cookie
   res.cookie("jwt", token, {
  httpOnly: true,
  secure: false,   // false because not using HTTPS locally
  sameSite: "lax", // or "strict"
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    // ✅ Send response (without exposing token in JSON)
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// =========================
// Verify Token Middleware
// =========================
// =========================
// Verify Token Middleware (cookie + header support)
// =========================
exports.verifyToken = async (req, res, next) => {
  let token;

  // 1. Check cookie first
  if (req.cookies.jwt) {
    token = req.cookies.jwt;  // ✅ FIXED: was "token" before
  }
  // 2. Fallback: check Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    req.user = { id: decoded.id }; // attach user id to req
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};


// =========================
// User Logout
// =========================
exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ success: true, message: "Logged out successfully" });
};
