# Aura Apparel E-Commerce (MERN Stack)

A full-stack, minimalist streetwear e-commerce platform built from scratch. This project demonstrates a complete MERN stack application with user authentication, product management, a shopping cart, wishlist, AI-powered shopping assistant, and admin dashboard.

**Live Demo:** [https://auraapparel.vercel.app](https://auraapparel.vercel.app)

---

## 🚀 Core Features

* **Full-Stack Authentication:** Users can register, log in, and log out. Passwords are hashed (using `bcryptjs`) and sessions are managed with **JSON Web Tokens (JWT)**.
* **Google OAuth Login:** Users can sign in instantly with their Google account using `@react-oauth/google`.
* **Global State Management:** Uses React Context API for:
    * **Auth Context:** Manages user login state globally.
    * **Cart Context:** Manages the shopping cart, with items saved to `localStorage` for persistence.
    * **Theme Context:** Manages light/dark mode toggle.
    * **Wishlist Context:** Manages user wishlists.
* **Full-Stack Wishlist:** Logged-in users can add/remove items to their wishlist. This is a protected route that updates the user model in MongoDB.
* **Dynamic Product Catalog:** Products are fetched from MongoDB, with pages for all products, search, filtering, and single product details.
* **Product Reviews & Ratings:** Authenticated users can submit reviews and star ratings on product pages.
* **Shopping Cart & Checkout:** Full cart functionality with checkout process and order management.
* **AI-Powered Chatbot (Aura AI):** A floating chat assistant powered by **Mistral AI** that can:
    * Recommend products based on preferences, style, budget, occasion, or brand
    * Build complete outfits from the live product catalog
    * Compare two or more products side by side
    * Answer FAQs about shipping, returns, sizing, and payment methods
    * Understand what's in the user's cart and suggest complementary items
* **Admin Dashboard:** Protected admin routes for managing products and orders.
* **Image Upload:** Cloudinary integration for product image uploads (via `multer`).
* **Smooth Animations:** Page and component transitions powered by **Framer Motion**.
* **Modern UI:** Built with Tailwind CSS, featuring a clean, responsive, and minimalist design.
* **Backend API:** A complete RESTful API built with Node.js, Express, and Mongoose.
* **Environment-Based Configuration:** Dynamic API URLs for seamless development and production deployment.

---

## 🛠 Tech Stack

### Frontend
* **React** (with Vite)
* **React Router** (for page navigation)
* **React Context API** (for global state)
* **Tailwind CSS** (for styling)
* **Framer Motion** (for animations and transitions)
* **Axios** (for API requests)
* **@react-oauth/google** (for Google OAuth login)
* **react-toastify** (for notifications)
* **lucide-react** (for icons)

### Backend
* **Node.js**
* **Express** (for the REST API)
* **MongoDB** (with Mongoose) (for the database)
* **JWT (jsonwebtoken)** (for authentication)
* **bcryptjs** (for password hashing)
* **Cloudinary** (for image hosting)
* **multer** (for handling image uploads)
* **google-auth-library** (for Google OAuth token verification)
* **Mistral AI** (for the AI chatbot)
* **CORS** (configured for security)
* **dotenv** (for environment variables)

---

## 📋 Prerequisites

Before running this project, make sure you have:
- **Node.js** (v14 or higher)
- **MongoDB** account (Atlas or local)
- **Cloudinary** account (for image uploads)
- **npm** or **yarn** package manager

---

## 🚀 Running Locally

To run this project on your local machine, you need to run both the `client` and `server`.

### 1. Clone the Repository

```bash
git clone https://github.com/pardeep1234567890/tech-commerce.git
cd tech-commerce
```

### 2. Backend Setup (Server)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy the example env file
cp .env.example .env

# Then update the values in /server/.env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
MISTRAL_API_KEY=your_mistral_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id

# Seed the database with sample products (optional)
node seeder.js -a

# Start the backend server
npm start
```

The backend will run on `http://localhost:3000`

Notes:
- `FRONTEND_URL` is optional for local development.
- Localhost and `127.0.0.1` are allowed on any port, so both `5173` and `5174` work.
- Use `FRONTEND_URL` and `FRONTEND_URLS` when you want to explicitly allow deployed frontends.

### 3. Frontend Setup (Client)

```bash
# Open a new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Copy the example env file
cp .env.example .env

# Then update the value in /client/.env
VITE_BACKEND_URL=http://localhost:3000

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 🌐 Deployment

This project is deployed on **Vercel** for both frontend and backend.

### Deploying to Vercel

**Full deployment instructions:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

**Quick Steps:**

1. **Deploy Backend:**
   ```bash
   cd server
   vercel --prod
   ```
   Add environment variables on the Vercel dashboard.
   Recommended:
   `FRONTEND_URL=https://auraapparel.vercel.app`

2. **Deploy Frontend:**
   ```bash
   cd client
   vercel --prod
   ```
   Add `VITE_BACKEND_URL` pointing to your backend URL.

---

## 📁 Project Structure

```
tech-commerce/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context providers
│   │   ├── config/        # API configuration
│   │   └── assets/        # Images and static files
│   ├── .env               # Frontend environment variables
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── config/           # Database and Cloudinary config
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Auth and admin middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── data/             # Seed data
│   ├── .env              # Backend environment variables
│   └── package.json
│
├── DEPLOYMENT_GUIDE.md   # Detailed deployment instructions
└── README.md             # This file
```

---

## 🔑 Key Features Explained

### Authentication Flow
- User registers/logs in → JWT token generated
- Token stored in `localStorage`
- Protected routes check for valid token
- Admin routes require `isAdmin` flag

### Google OAuth Login
- Users click "Sign in with Google" on the login/register page
- Frontend uses `@react-oauth/google` to obtain a Google ID token
- Backend verifies the token with `google-auth-library` and returns a JWT
- New users are created automatically on first Google login

### Aura AI Chatbot
- Floating chat widget available on every page
- Powered by **Mistral AI** (`mistral-small-latest` model)
- Fetches the live product catalog from MongoDB on each request for accurate, up-to-date recommendations
- Passes the user's current cart contents so the AI can suggest complementary items
- Supports conversation history for multi-turn chats
- Capabilities: product recommendations, outfit builder, product comparison, budget filtering, and FAQ support
- Renders markdown (bold/italic) in chat responses

### Product Reviews
- Logged-in users can submit a star rating and text comment on any product page
- Average rating and review count are stored on the product document in MongoDB

### API Configuration
- Dynamic backend URL using environment variables
- Development: `http://localhost:3000`
- Production: Your Vercel backend URL
- Import: `import { BACKEND_URL } from '../config/api'`

### CORS Security
- Configured to allow localhost and `127.0.0.1` on any port for local development
- Configured to accept explicitly authorized deployed origins via `FRONTEND_URL` and `FRONTEND_URLS`
- Supports credentials for JWT authentication
- Production URLs remain whitelisted

---

## 🔧 Environment Variables

### Server (`server/.env`)
- `PORT`: Backend port, usually `3000`
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `MISTRAL_API_KEY`: Mistral AI API key (powers the Aura AI chatbot)
- `GOOGLE_CLIENT_ID`: Google OAuth client ID (for Google login)
- `FRONTEND_URL`: Optional primary deployed frontend origin
- `FRONTEND_URLS`: Optional comma-separated extra frontend origins

Example:

```env
FRONTEND_URL=https://auraapparel.vercel.app
FRONTEND_URLS=https://staging-auraapparel.vercel.app,http://localhost:5173
```

### Client (`client/.env`)
- `VITE_BACKEND_URL`: Backend base URL used by the frontend

Example:

```env
VITE_BACKEND_URL=http://localhost:3000
```

---

## 🛒 Available Routes

### Public Routes
- `/` - Homepage with featured products
- `/shop` - All products with category filtering
- `/search/:keyword` - Search results
- `/product/:id` - Product details with reviews
- `/login` - User login (email/password or Google OAuth)
- `/register` - User registration
- `/about` - About page
- `/new` - New arrivals

### Protected User Routes
- `/checkout` - Checkout page
- `/myorders` - User's orders
- `/order/:id` - Order details
- `/wishlist` - User's wishlist

### Admin Routes
- `/admin` - Admin login page
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard overview
- `/admin/products` - Product management
- `/admin/product/:id/edit` - Edit product
- `/admin/orders` - Order management

---

## 🧪 Testing

### Seeder Commands

```bash
# Import sample data
node seeder.js -a

# Delete all data
node seeder.js -d
```

### Test Admin Account
Check your seeded users in MongoDB for admin credentials.

---

## 🐛 Troubleshooting

### CORS Errors
- Ensure `VITE_BACKEND_URL` is set correctly on frontend
- If your Vite port changes, localhost is already allowed on any port
- For deployed frontends, set `FRONTEND_URL` or `FRONTEND_URLS` on the backend
- See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for details

### Environment Variables Not Working
- Restart development server after changing `.env`
- Vite requires `VITE_` prefix for environment variables
- Check that `.env` files are not committed to git

### Database Connection Issues
- Verify MongoDB connection string
- Check IP whitelist in MongoDB Atlas
- Ensure network access is configured

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Pardeep Yadav**
- GitHub: [@pardeep1234567890](https://github.com/pardeep1234567890)

---

## 🙏 Acknowledgments

- React documentation
- Express.js documentation
- MongoDB documentation
- Tailwind CSS
- Vercel for hosting

---

**Note:** This is a learning project demonstrating full-stack MERN development with modern best practices including environment-based configuration, secure authentication, and cloud deployment.
