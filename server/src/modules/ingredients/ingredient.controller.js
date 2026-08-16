const ingredientService = require("./ingredient.service");
const sendResponse = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const MESSAGES = require("../../constants/messages");

const getAllIngredients = asyncHandler(async (req, res) => {

    const ingredients = await ingredientService.getAllIngredients();

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.INGREDIENT.FETCHED_ALL,
        ingredients
    );

});

const getIngredientById = asyncHandler(async (req, res) => {

    const ingredient = await ingredientService.getIngredientById(
        req.params.id
    );

    if (!ingredient) {

        return sendResponse(
            res,
            404,
            false,
            MESSAGES.INGREDIENT.NOT_FOUND
        );

    }

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.INGREDIENT.FETCHED,
        ingredient
    );

});

const createIngredient = asyncHandler(async (req, res) => {

    const ingredient = await ingredientService.createIngredient(
        req.body
    );

    return sendResponse(
        res,
        201,
        true,
        MESSAGES.INGREDIENT.CREATED,
        ingredient
    );

});

const updateIngredient = asyncHandler(async (req, res) => {

    const ingredient = await ingredientService.updateIngredient(
        req.params.id,
        req.body
    );

    if (!ingredient) {

        return sendResponse(
            res,
            404,
            false,
            MESSAGES.INGREDIENT.NOT_FOUND
        );

    }

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.INGREDIENT.UPDATED,
        ingredient
    );

});

module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient
};