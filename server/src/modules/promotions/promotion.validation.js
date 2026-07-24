const { body, param } = require("express-validator");

const createPromotionValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters."),

    body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters."),

    body("discount_percentage")
        .isFloat({ min: 0, max: 100 })
        .withMessage("Discount percentage must be between 0 and 100."),

    body("start_date")
        .isISO8601()
        .withMessage("Valid start date is required."),

    body("end_date")
        .isISO8601()
        .withMessage("Valid end date is required.")

];

const updatePromotionValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid promotion ID."),

    ...createPromotionValidation

];

const updatePromotionStatusValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid promotion ID."),

    body("is_active")
        .isBoolean()
        .withMessage("is_active must be true or false.")

];

const getPromotionByIdValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid promotion ID.")

];

module.exports = {
    createPromotionValidation,
    updatePromotionValidation,
    updatePromotionStatusValidation,
    getPromotionByIdValidation
};