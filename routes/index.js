const path = require("path");
const router = require("express").Router();
const articleRoutes = require("./articles");
const authRoutes = require("./auth");

// API Routes
router.use("/api", articleRoutes);
router.use("/api", authRoutes);

// If no API routes are hit, send the React app
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
