const express = require("express");
const router = express.Router();

const orderController = require("./order.controller");

const {
    createOrderValidation,
    getOrderByIdValidation,
    updateOrderStatusValidation
} = require("./order.validation");

const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const USER_ROLES = require("../../constants/userRoles");

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    createOrderValidation,
    orderController.createOrder
);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    authenticate,
    authorize(
        USER_ROLES.ADMIN,
        USER_ROLES.CASHIER,
        USER_ROLES.KITCHEN
    ),
    orderController.getAllOrders
);

router.get(
    "/:id",
    authenticate,
    authorize(
        USER_ROLES.ADMIN,
        USER_ROLES.CASHIER,
        USER_ROLES.KITCHEN
    ),
    getOrderByIdValidation,
    orderController.getOrderById
);

router.patch(
    "/:id/status",
    authenticate,
    authorize(
        USER_ROLES.ADMIN,
        USER_ROLES.CASHIER
    ),
    updateOrderStatusValidation,
    orderController.updateOrderStatus
);

module.exports = router;