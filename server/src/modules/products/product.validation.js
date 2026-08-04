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

    body("image")
        .optional({ nullable: true })
        .isString()
        .withMessage("Image must be a string."),

    body("prep_time")
        .isInt({ min: 1 })
        .withMessage("Preparation time must be at least 1 minute."),

    body("is_featured")
        .optional()
        .isBoolean()
        .withMessage("is_featured must be true or false."),

    body("display_order")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Display order must be zero or greater."),

    body("availability")
        .optional()
        .isIn([
            "available",
            "out_of_stock"
        ])
        .withMessage("Invalid availability.")

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

    body("is_active")
        .isBoolean()
        .withMessage("is_active must be true or false.")

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

const getProductIngredientsValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid product ID.")

];

const updateProductIngredientsValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid product ID."),

    body("ingredient_ids")
        .isArray({ min: 1 })
        .withMessage("ingredient_ids must be a non-empty array."),

    body("ingredient_ids.*")
        .isInt({ min: 1 })
        .withMessage("Each ingredient ID must be a positive integer.")

];

const updateProductPairingsValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid product ID."),

    body("paired_products")
        .isArray()
        .withMessage("paired_products must be an array."),

    body("paired_products.*")
        .isInt({ min: 1 })
        .withMessage("Each paired product must be a valid product ID.")

];

module.exports = {
    createProductValidation,
    updateProductValidation,
    updateProductStatusValidation,
    getProductByIdValidation,
    getProductsByCategoryValidation,
    searchProductsValidation,
    getProductIngredientsValidation,
    updateProductIngredientsValidation,
    updateProductPairingsValidation

};