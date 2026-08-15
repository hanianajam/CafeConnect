const { body, param } = require("express-validator");

const createFeedbackValidation = [

    body("order_id")
        .isInt({ min: 1 })
        .withMessage("Valid order ID is required."),

    body("overall_rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5."),

    body("comment")
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Comment cannot exceed 1000 characters."),

    body("would_recommend")
        .optional()
        .isBoolean()
        .withMessage("would_recommend must be true or false.")

];

const getFeedbackByIdValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid feedback ID.")

];

const deleteFeedbackValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid feedback ID.")

];

module.exports = {
    createFeedbackValidation,
    getFeedbackByIdValidation,
    deleteFeedbackValidation
};