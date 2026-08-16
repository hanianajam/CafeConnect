const authService = require("./auth.service");

const sendResponse = require("../../utils/response");
const asyncHandler = require("../../utils/asyncHandler");
const MESSAGES = require("../../constants/messages");

const login = asyncHandler(async (req, res) => {


    const { email, password } = req.body;

    const result = await authService.login(
        email,
        password
    );

    if (!result) {

        return sendResponse(
            res,
            401,
            false,
            MESSAGES.AUTH.INVALID_CREDENTIALS
        );

    }

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.AUTH.LOGIN_SUCCESS,
        result
    );

});

const profile = asyncHandler(async (req, res) => {

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.AUTH.PROFILE_FETCHED,
        req.user
    );

});

const logout = asyncHandler(async (req, res) => {

    return sendResponse(
        res,
        200,
        true,
        MESSAGES.AUTH.LOGOUT_SUCCESS
    );

});

module.exports = {
    login,
    profile,
    logout
};