# ☕ CaféConnect

> **A modern self-ordering café management system designed to streamline in-store ordering, payment, kitchen workflow, and order pickup.**

![Status](https://img.shields.io/badge/Status-In%20Development-orange)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)
![Express](https://img.shields.io/badge/Framework-Express-000000)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📖 About

CaféConnect is a full-stack web application that modernizes the café ordering experience through a self-ordering kiosk workflow.

Customers can browse the menu, view product details, check ingredients and allergen information, customize orders with notes, and place orders without creating an account. Orders are then processed by the cashier, prepared by the kitchen, and tracked in real time until pickup.

The project focuses on clean architecture, responsive design, modern UI/UX, and realistic business workflows rather than simple CRUD functionality.

---

# Key Features

### 👤 Customer

* Browse menu by category
* View product details
* Ingredient & allergen information
* Add products to cart
* Item-specific notes
* Anonymous ordering
* QR-based order tracking
* Live order status
* Customer feedback & ratings

---

### 💳 Cashier

* View pending orders
* Confirm payments
* Cash & card payment support

---

### 👨‍🍳 Kitchen

* View incoming orders
* Update preparation status
* Mark orders as ready
* Complete orders

---

### 👨‍💼 Admin

* Dashboard
* Manage products
* Manage categories
* Manage ingredients
* Manage promotions
* View customer feedback
* View order analytics

---

# 🚀 Planned Features

* ⭐ Best Sellers
* 🍂 Seasonal Specials
* ☕ Recommended Pairings
* 🎉 Happy Hour Promotions
* 📱 QR Order Tracking
* ⭐ Product Ratings
* 💬 Customer Feedback
* 📊 Admin Dashboard
* 📈 Sales Analytics

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* React Router
* Axios
* Bootstrap
* Framer Motion

## Backend

* Node.js
* Express.js
* JWT Authentication
* Express Validator
* Multer

## Database

* MySQL

---

# 🏗 Project Architecture

```
CafeConnect
│
├── client/
├── server/
├── docs/
├── README.md
└── LICENSE
```

Backend follows a **feature-based architecture** for better scalability and maintainability.

---

# 🗄 Database

Current database includes:

* Users
* Categories
* Products
* Ingredients
* Product Ingredients
* Product Pairings
* Orders
* Order Items
* Payments
* Promotions
* Order Status History
* Feedback
* Product Reviews

---

# 🔄 Customer Workflow

```
Welcome

↓

Browse Menu

↓

View Product

↓

Add to Cart

↓

Checkout

↓

Order Created

↓

Cashier Payment

↓

Kitchen Preparation

↓

Ready for Pickup

↓

Order Completed

↓

Feedback
```

---

# 📱 Order Tracking

Customers receive an order number and QR code after placing an order.

Order statuses:

* Pending Payment
* Paid
* Preparing
* Ready for Pickup
* Completed
* Cancelled

---

# 🎨 UI Design Goals

* Minimal
* Modern
* Premium
* Responsive
* Touchscreen Friendly
* Mobile Friendly
* Smooth Animations

---

# 📂 Documentation

Project documentation will be available in the `docs/` directory.

Planned documentation:

* ER Diagram
* API Documentation
* Database Schema
* Screenshots
* Future Roadmap

---

# 🚧 Project Status

This project is currently under active development.

Upcoming milestone:

* Express Server Setup
* MySQL Connection
* Authentication Module

---

# 🤝 Contributing

This project is currently maintained as a portfolio project.

Suggestions and feedback are always welcome.

---

# 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Developer

Developed as a portfolio project to demonstrate modern full-stack web development, clean architecture, responsive UI/UX, and real-world software engineering practices.
