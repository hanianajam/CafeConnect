const express = require("express");

const router = express.Router();

const paymentController = require("./payment.controller");

const {
    getPaymentByIdValidation,
    updatePaymentStatusValidation
} = require("./payment.validation");

const authMiddleware = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");


// Admin / Cashier
router.get(
    "/",
    authMiddleware,
    authorize("admin", "cashier"),
    paymentController.getAllPayments
);


// Admin / Cashier
router.get(
    "/:id",
    authMiddleware,
    authorize("admin", "cashier"),
    getPaymentByIdValidation,
    validate,
    paymentController.getPaymentById
);


// Admin / Cashier
router.patch(
    "/:id/status",
    authMiddleware,
    authorize("admin", "cashier"),
    updatePaymentStatusValidation,
    validate,
    paymentController.updatePaymentStatus
);


module.exports = router;