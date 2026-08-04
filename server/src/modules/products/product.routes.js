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
    updateProductIngredientsValidation
} = require("./product.validation");

const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
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
    productController.searchProducts
);

router.get(
    "/category/:categoryId",
    getProductsByCategoryValidation,
    productController.getProductsByCategory
);

router.get(
    "/:id",
    getProductByIdValidation,
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
    productController.createProduct
);

router.put(
    "/:id",
    authenticate,
    authorize(USER_ROLES.ADMIN),
    updateProductValidation,
    productController.updateProduct
);

router.patch(
    "/:id/status",
    authenticate,
    authorize(USER_ROLES.ADMIN),
    updateProductStatusValidation,
    productController.updateProductStatus
);

/*
|--------------------------------------------------------------------------
| Product Ingredient Routes 
|--------------------------------------------------------------------------
*/

router.get(
    "/:id/ingredients",
    getProductIngredientsValidation,
    productController.getProductIngredients
);

router.put(
    "/:id/ingredients",
    authenticate,
    authorize("admin", "manager"),
    updateProductIngredientsValidation,
    productController.updateProductIngredients
);

module.exports = router;