const { body, param } = require("express-validator");

const createIngredientValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Ingredient name is required.")
        .isLength({ max: 100 })
        .withMessage("Ingredient name cannot exceed 100 characters."),

    body("is_allergen")
        .optional()
        .isBoolean()
        .withMessage("is_allergen must be true or false.")

];

const updateIngredientValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid ingredient ID."),

    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Ingredient name cannot be empty.")
        .isLength({ max: 100 })
        .withMessage("Ingredient name cannot exceed 100 characters."),

    body("is_allergen")
        .optional()
        .isBoolean()
        .withMessage("is_allergen must be true or false.")

];

const getIngredientByIdValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid ingredient ID.")

];

module.exports = {
    createIngredientValidation,
    updateIngredientValidation,
    getIngredientByIdValidation
};