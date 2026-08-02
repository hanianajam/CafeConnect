const dashboardRepository = require("./dashboard.repository");

const getSummary = async () => {

    return await dashboardRepository.getSummary();

};

const getRecentOrders = async () => {

    return await dashboardRepository.getRecentOrders();

};

const getOrderStatus = async () => {

    return await dashboardRepository.getOrderStatus();

};

const getTopProducts = async () => {

    return await dashboardRepository.getTopProducts();

};

module.exports = {
    getSummary,
    getRecentOrders,
    getOrderStatus,
    getTopProducts
};