# E-Commerce Full Stack Application

This project is a full-stack e-commerce web application built with a React frontend and a Node.js/Express backend. It provides a modern shopping experience with features for users, admins, and order management.

## Features

### User Features

- Browse products by category, gender, and features
- Product search and filtering
- Product details and new arrivals
- Shopping cart and checkout
- Order history and order details
- User authentication (login/register)

### Admin Features

- Product management (add, edit, delete)
- Order management
- User management
- Dashboard overview

### General

- Responsive design with Tailwind CSS
- Payment integration (e.g., PayPal)
- Modern UI/UX

## Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB (via Mongoose)
- **Authentication:** JWT
- **Payment:** PayPal (integrated)

## Project Structure

```
backend/
  models/           # Mongoose models
  routes/           # Express routes
  middleWares/      # Custom middleware
  config/           # Database config
  data/             # Seed data
  server.js         # Entry point
  package.json      # Backend dependencies
frontend/
  src/
    components/     # React components
    pages/          # Page components
    redux/          # Redux store and slices
    App.jsx         # Main app
    main.jsx        # Entry point
  public/           # Static assets
  package.json      # Frontend dependencies
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd e-commerce
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables:**
   - Create a `.env` file in the `backend/` directory for MongoDB URI, JWT secret, etc.

5. **Seed the database (optional):**
   ```bash
   node seedProduct.js
   ```

### Running the Application

- **Start the backend:**
  ```bash
  cd backend
  npm start
  ```
- **Start the frontend:**
  ```bash
  cd frontend
  npm run dev
  ```

## Live Sites

Once deployed, you can access the live versions of the project here:

- **Frontend Live Site:** [frontend live demo](https://e-commerce.onrender.com)
- **Backend Live API:** [Api Swagger documentation](https://e-commerce1.onrender.com)

The frontend will run on [http://localhost:5173](http://localhost:5173) and the backend on [http://localhost:5000](http://localhost:5000) by default.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
