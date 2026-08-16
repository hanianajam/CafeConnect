const express = require("express");

const ingredientController = require("./ingredient.controller");

const {
    createIngredientValidation,
    updateIngredientValidation,
    getIngredientByIdValidation
} = require("./ingredient.validation");

const authMiddleware = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");

const router = express.Router();


// Public
router.get(
    "/",
    ingredientController.getAllIngredients
);


// Public
router.get(
    "/:id",
    getIngredientByIdValidation,
    validate,
    ingredientController.getIngredientById
);


// Admin only
router.post(
    "/",
    authMiddleware,
    authorize("admin"),
    createIngredientValidation,
    validate,
    ingredientController.createIngredient
);


// Admin only
router.put(
    "/:id",
    authMiddleware,
    authorize("admin"),
    updateIngredientValidation,
    validate,
    ingredientController.updateIngredient
);


module.exports = router;