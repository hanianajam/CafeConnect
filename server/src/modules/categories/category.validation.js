const { body, param } = require("express-validator");

const categoryIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid category ID.")
];

const categoryValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required.")
        .isLength({ min: 2, max: 50 })
        .withMessage(
            "Category name must be between 2 and 50 characters."
        ),

    body("description")
        .optional()
        .isLength({ max: 255 })
        .withMessage(
            "Description cannot exceed 255 characters."
        ),

    body("image_url")
        .optional({ nullable: true })
        .isURL()
        .withMessage("Image URL must be valid."),

    body("display_order")
        .optional()
        .isInt({ min: 0 })
        .withMessage(
            "Display order must be a positive number."
        ),

    body("is_active")
        .optional()
        .isBoolean()
        .withMessage(
            "is_active must be true or false."
        )

];

const categoryStatusValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid category ID."),

    body("is_active")
        .exists()
        .withMessage("is_active is required.")
        .isBoolean()
        .withMessage(
            "is_active must be true or false."
        )
];

module.exports = {
    categoryIdValidation,
    categoryValidation,
    categoryStatusValidation
};