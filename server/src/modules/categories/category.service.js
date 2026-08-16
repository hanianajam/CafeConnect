const categoryRepository = require("./category.repository");
const MESSAGES = require("../../constants/messages");

const getAllCategories = async () => {

    return await categoryRepository.getAll();

};


const getCategoryById = async (id) => {

    return await categoryRepository.getById(id);

};


const createCategory = async (categoryData) => {

    const category = {
        name: categoryData.name.trim(),
        description: categoryData.description || "",
        image_url: categoryData.image_url || null,
        display_order: categoryData.display_order ?? 0,
        is_active: categoryData.is_active ?? true
    };

    return await categoryRepository.create(category);

};


const updateCategory = async (id, categoryData) => {

    const category = {
        name: categoryData.name.trim(),
        description: categoryData.description || "",
        image_url: categoryData.image_url || null,
        display_order: categoryData.display_order ?? 0,
        is_active: categoryData.is_active ?? true
    };

    const affectedRows =
        await categoryRepository.update(id, category);

    if (affectedRows === 0) {

        const error = new Error(
            MESSAGES.CATEGORY.NOT_FOUND
        );

        error.statusCode = 404;

        throw error;
    }

};


const updateCategoryStatus = async (id, status) => {

    const affectedRows =
        await categoryRepository.updateStatus(id, status);

    if (affectedRows === 0) {

        const error = new Error(
            MESSAGES.CATEGORY.NOT_FOUND
        );

        error.statusCode = 404;

        throw error;
    }

};


module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    updateCategoryStatus
};