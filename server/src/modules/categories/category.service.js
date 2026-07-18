const categoryRepository = require("./categories.repository");

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

    await categoryRepository.update(id, category);
};

const updateCategoryStatus = async (id, status) => {
    await categoryRepository.updateStatus(id, status);
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    updateCategoryStatus
};