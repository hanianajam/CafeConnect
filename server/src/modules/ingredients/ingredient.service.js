const ingredientRepository = require("./ingredient.repository");

const getAllIngredients = async () => {

    return await ingredientRepository.getAllIngredients();

};

const getIngredientById = async (id) => {

    return await ingredientRepository.getIngredientById(id);

};

const createIngredient = async (ingredientData) => {

    return await ingredientRepository.createIngredient(
        ingredientData
    );

};

const updateIngredient = async (
    id,
    ingredientData
) => {

    return await ingredientRepository.updateIngredient(
        id,
        ingredientData
    );

};

module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient
};