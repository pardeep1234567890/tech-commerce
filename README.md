# Aura Apparel E-Commerce (MERN Stack)

![Aura Apparel Homepage Screenshot](httpsa-apparel-screenshot.png) A full-stack, minimalist streetwear e-commerce platform built from scratch. This project demonstrates a complete MERN stack application with user authentication, product management, a shopping cart, and a full-stack wishlist.

**Live Demo Link:** [Link to your deployed site on Vercel/Render]

---

## 🚀 Core Features

* **Full-Stack Authentication:** Users can register, log in, and log out. Passwords are *hashed* (using `bcryptjs`) and sessions are managed with **JSON Web Tokens (JWT)**.
* **Global State Management:** Uses React Context API for:
    * **Auth Context:** Manages user login state globally.
    * **Cart Context:** Manages the shopping cart, with items saved to `localStorage` for persistence.
    * **Theme Context:** Manages a (light/dark) mode toggle.
* **Full-Stack Wishlist:** (The "Connector" Feature) Logged-in users can add/remove items to their wishlist. This is a protected route that updates the `user` model in the MongoDB database.
* **Dynamic Product Catalog:** Products are fetched from the MongoDB database, with pages for all products (PLP) and single products (PDP).
* **Modern UI:** Built with Tailwind CSS, featuring a clean, responsive, and minimalist "Aura Apparel" theme.
* **Backend API:** A complete RESTful API built with Node.js, Express, and Mongoose.

---

## 🛠 Tech Stack

### Frontend
* **React** (with Vite)
* **React Router** (for page navigation)
* **React Context API** (for global state)
* **Tailwind CSS** (for styling)
* **Axios** (for API requests)
* `react-toastify` (for notifications)
* `lucide-react` (for icons)

### Backend
* **Node.js**
* **Express** (for the REST API)
* **MongoDB** (with Mongoose) (for the database)
* **JWT (jsonwebtoken)** (for auth)
* **bcryptjs** (for password hashing)
* `dotenv` (for environment variables)

---

## Running Locally

To run this project on your local machine, you will need to run the `client` and `server` separately.

### 1. Backend (Server)

```bash
# 1. Clone the repository
git clone [https://github.com/YOUR_USERNAME/aura-apparel.git](https://github.com/YOUR_USERNAME/aura-apparel.git)

# 2. Navigate to the server directory
cd aura-apparel/server

# 3. Install dependencies
npm install

# 4. Create a .env file in the /server folder
# You must add your own:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

# 5. Run the seeder to populate the database
npm run data:import

# 6. Start the server
npm run dev