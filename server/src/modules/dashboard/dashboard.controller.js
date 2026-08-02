const dashboardService = require("./dashboard.service");
const sendResponse = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const MESSAGES = require("../../constants/messages");

const getSummary = asyncHandler(async (req, res) => {

    const summary = await dashboardService.getSummary();

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.DASHBOARD.SUMMARY_FETCHED,
        summary
    );

});

const getRecentOrders = asyncHandler(async (req, res) => {

    const orders = await dashboardService.getRecentOrders();

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.DASHBOARD.RECENT_ORDERS_FETCHED,
        orders
    );

});

const getOrderStatus = asyncHandler(async (req, res) => {

    const status = await dashboardService.getOrderStatus();

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.DASHBOARD.ORDER_STATUS_FETCHED,
        status
    );

});

const getTopProducts = asyncHandler(async (req, res) => {

    const products = await dashboardService.getTopProducts();

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.DASHBOARD.TOP_PRODUCTS_FETCHED,
        products
    );

});

module.exports = {
    getSummary,
    getRecentOrders,
    getOrderStatus,
    getTopProducts
};