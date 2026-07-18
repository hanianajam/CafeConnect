const getHealthStatus = () => {
    return {
        success: true,
        message: "CafeConnect API is running 🚀",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    };
};

module.exports = {
    getHealthStatus
};