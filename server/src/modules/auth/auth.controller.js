const { validationResult } = require("express-validator");
const authService = require("./auth.service");
const sendResponse = require("../../utils/response");

const login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return sendResponse(
            res,
            400,
            false,
            "Validation failed",
            errors.array()
        );
    }

    try {

        const { email, password } = req.body;

        const result = await authService.login(email, password);

        if (result === null) {
            return sendResponse(res,404,false,"User not found");
        }

        if (result === false) {
            return sendResponse(res,401,false,"Invalid password");
        }

        return sendResponse(
            res,
            200,
            true,
            "Login successful",
            result
        );

    } catch (error) {

        return sendResponse(
            res,
            500,
            false,
            error.message
        );

    }

};

const profile = async (req,res)=>{

    return sendResponse(
        res,
        200,
        true,
        "Profile fetched successfully",
        req.user
    );

};

const logout = async(req,res)=>{

    return sendResponse(
        res,
        200,
        true,
        "Logout successful"
    );

};

module.exports={
    login,
    profile,
    logout
};