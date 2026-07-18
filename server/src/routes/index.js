const express = require("express");

const router = express.Router();

const healthRoutes = require("../modules/health/health.routes");

router.use("/health", healthRoutes);

module.exports = router;