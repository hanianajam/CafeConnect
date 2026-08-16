const productService = require("./product.service");
const sendResponse = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const MESSAGES = require("../../constants/messages");

const getAllProducts = asyncHandler(async (req, res) => {

    const products = await productService.getAllProducts();

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PRODUCT.FETCHED_ALL,
        products
    );

});

const getProductById = asyncHandler(async (req, res) => {

    const product = await productService.getProductById(req.params.id);

    if (!product) {

        return sendResponse(
            res,
            404,
            false,
            MESSAGES.PRODUCT.NOT_FOUND
        );

    }

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PRODUCT.FETCHED,
        product
    );

});

const getProductsByCategory = asyncHandler(async (req, res) => {

    const products = await productService.getProductsByCategory(
        req.params.categoryId
    );

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PRODUCT.FETCHED_ALL,
        products
    );

});

const getFeaturedProducts = asyncHandler(async (req, res) => {

    const products = await productService.getFeaturedProducts();

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PRODUCT.FETCHED_ALL,
        products
    );

});

const searchProducts = asyncHandler(async (req, res) => {

    const products = await productService.searchProducts(req.query.q);

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PRODUCT.FETCHED_ALL,
        products
    );

});

const createProduct = asyncHandler(async (req, res) => {

    const id = await productService.createProduct(req.body);

    return sendResponse(
        res,
        201,
        true,
        MESSAGES.PRODUCT.CREATED,
        { id }
    );

});

const updateProduct = asyncHandler(async (req, res) => {

    await productService.updateProduct(
        req.params.id,
        req.body
    );

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PRODUCT.UPDATED
    );

});

const updateProductStatus = asyncHandler(async (req, res) => {

    await productService.updateProductStatus(
        req.params.id,
        req.body.is_active
    );

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PRODUCT.STATUS_UPDATED
    );

});

const getProductIngredients = asyncHandler(async (req, res) => {

    const ingredients =
        await productService.getProductIngredients(
            req.params.id
        );

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PRODUCT.INGREDIENTS_FETCHED,
        ingredients
    );

});

const getProductPairings = asyncHandler(async (req, res) => {

    const pairings = await productService.getProductPairings(
        req.params.id
    );

    return sendResponse(
        res,
        200,
        true,
        "Product pairings fetched successfully.",
        pairings
    );

});

const updateProductIngredients = asyncHandler(async (req, res) => {

    await productService.updateProductIngredients(
        req.params.id,
        req.body.ingredient_ids
    );

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.PRODUCT.INGREDIENTS_UPDATED
    );

});

const updateProductPairings = asyncHandler(async (req, res) => {

    await productService.updateProductPairings(
        req.params.id,
        req.body.paired_products
    );

    return sendResponse(
        res,
        200,
        true,
        "Product pairings updated successfully."
    );

});

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
    updateProductIngredients,
    getProductPairings,
    updateProductPairings
};