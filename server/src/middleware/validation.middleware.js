const { validationResult } = require("express-validator");

const sendResponse = require("../utils/response");
const MESSAGES = require("../constants/messages");

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return sendResponse(
            res,
            400,
            false,
            MESSAGES.COMMON.VALIDATION_FAILED,
            errors.array()
        );

    }

    next();

};

module.exports = validate;