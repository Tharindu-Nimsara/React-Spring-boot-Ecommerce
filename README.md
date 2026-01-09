# Vehicle Spare Parts E-commerce Shop - Frontend

A modern React.js frontend application for a Vehicle Spare Parts E-commerce Shop that connects to a Spring Boot REST API.

## Features

- 🛒 Shopping cart functionality
- 🔐 JWT Authentication
- 📦 Product catalog with search and filtering
- 🛍️ Product detail pages
- 📋 Order history
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔒 Protected routes for authenticated users

## Tech Stack

- **React.js** (JavaScript)
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **Lucide React** for icons
- **Context API** for state management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Spring Boot backend running on `http://localhost:8080`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   └── PrivateRoute.jsx
├── contexts/         # React Context providers
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── ProductCatalog.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   └── OrderHistory.jsx
├── services/        # API service layer
│   └── api.js
├── App.jsx          # Main app component with routing
├── main.jsx         # Entry point
└── index.css        # Global styles with Tailwind
```

## API Integration

The frontend connects to the Spring Boot backend at `http://localhost:8080`:

- **Auth**: `/api/users/login`, `/api/users/register`
- **Products**: `/api/products`
- **Cart**: `/api/cart/add`, `/api/cart`
- **Checkout**: `/api/checkout`, `/api/checkout/history`
- **Images**: `http://localhost:8080/uploads/{filename}`

## Features Overview

### Authentication
- User registration and login
- JWT token stored in localStorage
- Automatic token attachment to API requests
- Protected routes for authenticated pages

### Shopping Experience
- Browse products with search and category filtering
- View detailed product information
- Add items to cart
- View cart and proceed to checkout
- View order history

### UI/UX
- Responsive design for all screen sizes
- Clean, modern industrial theme
- Loading states and error handling
- Intuitive navigation

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## License

University Project 2026 - Educational Purpose Only

