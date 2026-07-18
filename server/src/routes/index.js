const express = require("express");

const router = express.Router();

const healthRoutes = require("../modules/health/health.routes");
const authRoutes = require("../modules/auth/auth.routes");

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);

module.exports = router;