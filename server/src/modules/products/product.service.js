const productRepository = require("./product.repository");

const getAllProducts = async () => {
    return await productRepository.getAllProducts();
};

const getProductById = async (id) => {
    return await productRepository.getProductById(id);
};

const getProductsByCategory = async (categoryId) => {
    return await productRepository.getProductsByCategory(categoryId);
};

const getFeaturedProducts = async () => {
    return await productRepository.getFeaturedProducts();
};

const searchProducts = async (keyword) => {
    return await productRepository.searchProducts(keyword);
};

const createProduct = async (product) => {
    return await productRepository.createProduct(product);
};

const updateProduct = async (id, product) => {
    return await productRepository.updateProduct(id, product);
};

const updateProductStatus = async (id, isActive) => {
    return await productRepository.updateProductStatus(
        id,
        isActive
    );
};

const getProductIngredients = async (productId) => {

    return await productRepository.getProductIngredients(productId);

};

const updateProductIngredients = async (
    productId,
    ingredientIds
) => {

    return await productRepository.updateProductIngredients(
        productId,
        ingredientIds
    );

};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    searchProducts,
    createProduct,
    updateProduct,
    updateProductStatus,
    getProductIngredients,
    updateProductIngredients
};