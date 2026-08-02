-- =====================================================
-- CafeConnect Database
-- Smart Self-Ordering & Pickup Platform
-- Version: 1.0
-- =====================================================

DROP DATABASE IF EXISTS cafe_connect;
CREATE DATABASE cafe_connect;
USE cafe_connect;

-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','manager', 'cashier', 'kitchen') NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- CATEGORIES
-- =====================================================

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    image VARCHAR(255),

    display_order INT DEFAULT 1,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- PRODUCTS
-- =====================================================

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,

    category_id INT NOT NULL,

    name VARCHAR(100) NOT NULL,
    description TEXT,

    price DECIMAL(10,2) NOT NULL,

    image VARCHAR(255),

    prep_time INT NOT NULL DEFAULT 3,

    is_featured BOOLEAN DEFAULT FALSE,

    availability ENUM('available','out_of_stock')
        DEFAULT 'available',

    display_order INT DEFAULT 1,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
);

-- =====================================================
-- INGREDIENTS
-- =====================================================

CREATE TABLE ingredients (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    is_allergen BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- PRODUCT INGREDIENTS
-- Many-to-Many
-- =====================================================

CREATE TABLE product_ingredients (

    product_id INT NOT NULL,

    ingredient_id INT NOT NULL,

    PRIMARY KEY(product_id, ingredient_id),

    FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    FOREIGN KEY(ingredient_id)
        REFERENCES ingredients(id)
);

-- =====================================================
-- ORDERS
-- =====================================================

CREATE TABLE orders (

    id INT AUTO_INCREMENT PRIMARY KEY,

    order_number VARCHAR(20) UNIQUE NOT NULL,

    customer_name VARCHAR(100),

    total_amount DECIMAL(10,2) NOT NULL,

    estimated_ready_time DATETIME,

    status ENUM(
        'pending_payment',
        'paid',
        'preparing',
        'ready',
        'completed',
        'cancelled'
    ) DEFAULT 'pending_payment',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- ORDER ITEMS
-- =====================================================

CREATE TABLE order_items (

    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL,

    product_id INT NOT NULL,

    quantity INT NOT NULL DEFAULT 1,

    unit_price DECIMAL(10,2) NOT NULL,

    notes VARCHAR(255),

    FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    FOREIGN KEY(product_id)
        REFERENCES products(id)
);

-- =====================================================
-- PAYMENTS
-- =====================================================

CREATE TABLE payments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL UNIQUE,

    payment_method ENUM(
        'cash',
        'card'
    ),

    payment_status ENUM(
        'pending',
        'paid',
        'refunded'
    ) DEFAULT 'pending',

    amount DECIMAL(10,2) NOT NULL,

    paid_at TIMESTAMP NULL,

    FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,
        
	updated_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- ORDER STATUS HISTORY
-- =====================================================

CREATE TABLE order_status_history (

    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL,

    status ENUM(
        'pending_payment',
        'paid',
        'preparing',
        'ready',
        'completed',
        'cancelled'
    ) NOT NULL,

    updated_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    FOREIGN KEY(updated_by)
        REFERENCES users(id)
);

-- =====================================================
-- FEEDBACK
-- =====================================================

CREATE TABLE feedback (

    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT UNIQUE NOT NULL,

    overall_rating TINYINT NOT NULL,

    comment TEXT,

    would_recommend BOOLEAN,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);

-- =====================================================
-- PRODUCT REVIEWS
-- =====================================================

CREATE TABLE product_reviews (

    id INT AUTO_INCREMENT PRIMARY KEY,

    order_item_id INT UNIQUE NOT NULL,

    rating TINYINT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(order_item_id)
        REFERENCES order_items(id)
        ON DELETE CASCADE
);

-- =====================================================
-- PRODUCT PAIRINGS
-- =====================================================

CREATE TABLE product_pairings (

    id INT AUTO_INCREMENT PRIMARY KEY,

    product_id INT NOT NULL,

    paired_product_id INT NOT NULL,

    FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    FOREIGN KEY(paired_product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_product_category
ON products(category_id);

CREATE INDEX idx_order_status
ON orders(status);

CREATE INDEX idx_order_created
ON orders(created_at);

CREATE INDEX idx_payment_status
ON payments(payment_status);

CREATE INDEX idx_featured
ON products(is_featured);

CREATE INDEX idx_availability
ON products(availability);

-- =====================================================
-- PROMOTIONS
-- =====================================================

CREATE TABLE promotions (
    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(100) NOT NULL,
    description TEXT,

    discount_percentage DECIMAL(5,2) NOT NULL,

    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);