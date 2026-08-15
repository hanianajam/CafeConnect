const { body, param } = require("express-validator");

const getPaymentByIdValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid payment ID.")

];

const updatePaymentStatusValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid payment ID."),

    body("status")
        .isIn([
            "pending",
            "paid",
            "refunded"
        ])
        .withMessage(
            "Payment status must be pending, paid, or refunded."
        )

];

module.exports = {
    getPaymentByIdValidation,
    updatePaymentStatusValidation
};