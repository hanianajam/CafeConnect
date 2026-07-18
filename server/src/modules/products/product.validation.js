const { body, param, query } = require("express-validator");

const createProductValidation = [

    body("category_id")
        .isInt({ min: 1 })
        .withMessage("Valid category is required."),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required.")
        .isLength({ max: 100 })
        .withMessage("Product name cannot exceed 100 characters."),

    body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters."),

    body("price")
        .isFloat({ min: 0 })
        .withMessage("Valid price is required."),

    body("image_url")
        .optional({ nullable: true })
        .isString()
        .withMessage("Image URL must be a string."),

    body("preparation_time")
        .isInt({ min: 1 })
        .withMessage("Preparation time must be at least 1 minute."),

    body("is_featured")
        .optional()
        .isBoolean()
        .withMessage("is_featured must be true or false."),

    body("display_order")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Display order must be a positive number.")

];

const updateProductValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid product ID."),

    ...createProductValidation

];

const updateProductStatusValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid product ID."),

    body("is_available")
        .isBoolean()
        .withMessage("is_available must be true or false.")

];

const getProductByIdValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid product ID.")

];

const getProductsByCategoryValidation = [

    param("categoryId")
        .isInt({ min: 1 })
        .withMessage("Invalid category ID.")

];

const searchProductsValidation = [

    query("q")
        .trim()
        .notEmpty()
        .withMessage("Search keyword is required.")

];

module.exports = {
    createProductValidation,
    updateProductValidation,
    updateProductStatusValidation,
    getProductByIdValidation,
    getProductsByCategoryValidation,
    searchProductsValidation
};