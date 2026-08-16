const express = require("express");
const router = express.Router();

const productController = require("./product.controller");

const {
    createProductValidation,
    updateProductValidation,
    updateProductStatusValidation,
    getProductByIdValidation,
    getProductsByCategoryValidation,
    searchProductsValidation,
    getProductIngredientsValidation,
    updateProductIngredientsValidation,
    updateProductPairingsValidation
} = require("./product.validation");

const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");
const USER_ROLES = require("../../constants/userRoles");

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    productController.getAllProducts
);

router.get(
    "/featured",
    productController.getFeaturedProducts
);

router.get(
    "/search",
    searchProductsValidation,
    validate,
    productController.searchProducts
);

router.get(
    "/category/:categoryId",
    getProductsByCategoryValidation,
    validate,
    productController.getProductsByCategory
);

router.get(
    "/:id",
    getProductByIdValidation,
    validate,
    productController.getProductById
);

/*
|--------------------------------------------------------------------------
| Protected Routes (Admin)
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authenticate,
    authorize(USER_ROLES.ADMIN),
    createProductValidation,
    validate,
    productController.createProduct
);

router.put(
    "/:id",
    authenticate,
    authorize(USER_ROLES.ADMIN),
    updateProductValidation,
    validate,
    productController.updateProduct
);

router.patch(
    "/:id/status",
    authenticate,
    authorize(USER_ROLES.ADMIN),
    updateProductStatusValidation,
    validate,
    productController.updateProductStatus
);

/*
|--------------------------------------------------------------------------
| Product Ingredients
|--------------------------------------------------------------------------
*/

router.get(
    "/:id/ingredients",
    getProductIngredientsValidation,
    validate,
    productController.getProductIngredients
);

router.put(
    "/:id/ingredients",
    authenticate,
    authorize("admin", "manager"),
    updateProductIngredientsValidation,
    validate,
    productController.updateProductIngredients
);

/*
|--------------------------------------------------------------------------
| Product Pairings 
|--------------------------------------------------------------------------
*/

router.get(
    "/:id/pairings",
    getProductByIdValidation,
    validate,
    productController.getProductPairings
);

router.put(
    "/:id/pairings",
    authenticate,
    authorize("admin"),
    updateProductPairingsValidation,
    validate,
    productController.updateProductPairings
);

module.exports = router;