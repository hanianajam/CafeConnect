const { body, param } = require("express-validator");
const ORDER_STATUS = require("../../constants/orderStatus");

const createOrderValidation = [

    body("customer_name")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Customer name cannot exceed 100 characters."),

    body("payment_method")
        .isIn(["cash", "card"])
        .withMessage("Payment method must be cash or card."),

    body("items")
        .isArray({ min: 1 })
        .withMessage("At least one item is required."),

    body("items.*.product_id")
        .isInt({ min: 1 })
        .withMessage("Valid product ID is required."),

    body("items.*.quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1."),

    body("items.*.notes")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Notes cannot exceed 255 characters.")

];

const getOrderByIdValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid order ID.")

];

const updateOrderStatusValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid order ID."),

    body("status")
        .isIn([
            ORDER_STATUS.PENDING_PAYMENT,
            ORDER_STATUS.PAID,
            ORDER_STATUS.PREPARING,
            ORDER_STATUS.READY,
            ORDER_STATUS.COMPLETED,
            ORDER_STATUS.CANCELLED
        ])
        .withMessage("Invalid order status.")

];

module.exports = {
    createOrderValidation,
    getOrderByIdValidation,
    updateOrderStatusValidation
};