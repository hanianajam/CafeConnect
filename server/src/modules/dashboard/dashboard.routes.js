const express = require("express");

const router = express.Router();

const dashboardController = require("./dashboard.controller");

const authenticate = require("../../middleware/auth.middleware");

router.get(
    "/summary",
    authenticate,
    dashboardController.getSummary
);

router.get(
    "/recent-orders",
    authenticate,
    dashboardController.getRecentOrders
);

router.get(
    "/order-status",
    authenticate,
    dashboardController.getOrderStatus
);

router.get(
    "/top-products",
    authenticate,
    dashboardController.getTopProducts
);

module.exports = router;