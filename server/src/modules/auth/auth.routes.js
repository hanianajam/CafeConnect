const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");
const { loginValidation } = require("./auth.validation");

const authenticate = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validation.middleware");

router.post(
    "/login",
    loginValidation,
    validate,
    authController.login
);

router.get(
    "/profile",
    authenticate,
    authController.profile
);

router.post(
    "/logout",
    authenticate,
    authController.logout
);

module.exports = router;