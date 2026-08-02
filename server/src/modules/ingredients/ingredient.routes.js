const express = require("express");

const ingredientController = require("./ingredient.controller");
const {
    createIngredientValidation,
    updateIngredientValidation,
    getIngredientByIdValidation
} = require("./ingredient.validation");

const authMiddleware = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

const router = express.Router();

router.get(
    "/",
    ingredientController.getAllIngredients
);

router.get(
    "/:id",
    getIngredientByIdValidation,
    ingredientController.getIngredientById
);

router.post(
    "/",
    authMiddleware,
    authorize("admin"),
    createIngredientValidation,
    ingredientController.createIngredient
);

router.put(
    "/:id",
    authMiddleware,
    authorize("admin"),
    updateIngredientValidation,
    ingredientController.updateIngredient
);

module.exports = router;