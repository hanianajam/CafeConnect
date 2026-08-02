const pool = require("../../config/db");

const getAllIngredients = async () => {

    const [rows] = await pool.query(
        `
        SELECT *
        FROM ingredients
        ORDER BY name
        `
    );

    return rows;

};

const getIngredientById = async (id) => {

    const [rows] = await pool.query(
        `
        SELECT *
        FROM ingredients
        WHERE id = ?
        `,
        [id]
    );

    return rows[0] || null;

};

const createIngredient = async (ingredientData) => {

    const {
        name,
        is_allergen
    } = ingredientData;

    const [result] = await pool.query(
        `
        INSERT INTO ingredients
        (
            name,
            is_allergen
        )
        VALUES (?, ?)
        `,
        [
            name,
            is_allergen ?? false
        ]
    );

    return {
        id: result.insertId,
        name,
        is_allergen: is_allergen ?? false
    };

};

const updateIngredient = async (id, ingredientData) => {

    const {
        name,
        is_allergen
    } = ingredientData;

    const [result] = await pool.query(
        `
        UPDATE ingredients
        SET
            name = ?,
            is_allergen = ?
        WHERE id = ?
        `,
        [
            name,
            is_allergen,
            id
        ]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        id,
        name,
        is_allergen
    };

};

module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient
};