const MESSAGES = {
    AUTH: {
        LOGIN_SUCCESS: "Login successful.",
        INVALID_CREDENTIALS: "Invalid email or password.",
        PROFILE_FETCHED: "Profile fetched successfully.",
        LOGOUT_SUCCESS: "Logout successful."
    },

    CATEGORY: {
        FETCHED: "Category fetched successfully.",
        FETCHED_ALL: "Categories fetched successfully.",
        CREATED: "Category created successfully.",
        UPDATED: "Category updated successfully.",
        STATUS_UPDATED: "Category status updated successfully.",
        NOT_FOUND: "Category not found."
    },

    PRODUCT: {
    FETCHED: "Product fetched successfully.",
    FETCHED_ALL: "Products fetched successfully.",
    CREATED: "Product created successfully.",
    UPDATED: "Product updated successfully.",
    STATUS_UPDATED: "Product status updated successfully.",
    NOT_FOUND: "Product not found."
    },

    COMMON: {
        SERVER_ERROR: "Internal Server Error.",
        VALIDATION_FAILED: "Validation failed."
    },

    PROMOTION: {
    FETCHED: "Promotion fetched successfully.",
    FETCHED_ALL: "Promotions fetched successfully.",
    CREATED: "Promotion created successfully.",
    UPDATED: "Promotion updated successfully.",
    STATUS_UPDATED: "Promotion status updated successfully.",
    NOT_FOUND: "Promotion not found."
    },

    ORDER: {

    FETCHED: "Order fetched successfully.",
    FETCHED_ALL: "Orders fetched successfully.",
    CREATED: "Order created successfully.",
    STATUS_UPDATED: "Order status updated successfully.",
    NOT_FOUND: "Order not found."
    },

    DASHBOARD: {
    SUMMARY_FETCHED: "Dashboard summary fetched successfully.",
    RECENT_ORDERS_FETCHED: "Recent orders fetched successfully.",
    ORDER_STATUS_FETCHED: "Order status statistics fetched successfully.",
    TOP_PRODUCTS_FETCHED: "Top products fetched successfully."
    }
};

module.exports = MESSAGES;