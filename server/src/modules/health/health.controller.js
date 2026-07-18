const healthService = require("./health.service");

const checkHealth = (req, res) => {
    const data = healthService.getHealthStatus();

    res.status(200).json(data);
};

module.exports = {
    checkHealth
};