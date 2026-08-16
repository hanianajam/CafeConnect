const categoryService = require("./category.service");
const sendResponse = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const MESSAGES = require("../../constants/messages");

const getAllCategories = asyncHandler(async (req, res) => {

    const categories = await categoryService.getAllCategories();

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.CATEGORY.FETCHED_ALL,
        categories
    );

});

const getCategoryById = asyncHandler(async (req, res) => {

    const category = await categoryService.getCategoryById(req.params.id);

    if (!category) {
        return sendResponse(
            res,
            404,
            false,
            MESSAGES.CATEGORY.NOT_FOUND
        );
    }

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.CATEGORY.FETCHED,
        category
    );

});

const createCategory = asyncHandler(async (req, res) => {

    const id = await categoryService.createCategory(req.body);

    return sendResponse(
        res,
        201,
        true,
        MESSAGES.CATEGORY.CREATED,
        { id }
    );

});

const updateCategory = asyncHandler(async (req, res) => {

    await categoryService.updateCategory(
        req.params.id,
        req.body
    );

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.CATEGORY.UPDATED
    );

});

const updateCategoryStatus = asyncHandler(async (req, res) => {

    await categoryService.updateCategoryStatus(
        req.params.id,
        req.body.is_active
    );

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.CATEGORY.STATUS_UPDATED
    );

});

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    updateCategoryStatus
};