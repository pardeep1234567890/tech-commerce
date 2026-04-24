# Aura Apparel E-Commerce (MERN Stack)

A full-stack, premium streetwear e-commerce platform built from scratch with an AI-powered shopping assistant and Google OAuth integration. This project demonstrates a complete MERN stack application with modern authentication, product management, a shopping cart, wishlist, AI chatbot, and admin dashboard.

**Live Demo:** [https://auraapparel.vercel.app](https://auraapparel.vercel.app)

---

## 🚀 Core Features

* **Full-Stack Authentication:** Users can register, log in, and log out. Passwords are hashed (using `bcryptjs`) and sessions are managed with **JSON Web Tokens (JWT)**.
* **Google OAuth Login:** Seamless "Sign in with Google" integration using `@react-oauth/google` on the frontend and `google-auth-library` on the backend. Supports both account creation and account linking for existing users.
* **AI Shopping Assistant (Aura AI):** An intelligent chatbot powered by **Mistral AI** that provides:
    * **Product Recommendations** — personalized suggestions from the live product catalog.
    * **Style Advisor & Outfit Builder** — complete outfit suggestions for any occasion (party, office, casual, etc.) with total price calculation.
    * **Budget-Aware Shopping** — filters and recommends products within a user's stated budget.
    * **Product Comparison** — side-by-side comparison tables for any two or more products.
    * **Cart Awareness** — understands the user's current cart and suggests complementary items.
    * **FAQ & Support** — answers questions about shipping, returns, sizing, and payments.
* **Global State Management:** Uses React Context API for:
    * **Auth Context:** Manages user login state globally.
    * **Cart Context:** Manages the shopping cart, with items saved to `localStorage` for persistence.
    * **Theme Context:** Manages light/dark mode toggle.
    * **Wishlist Context:** Manages user wishlists.
* **Full-Stack Wishlist:** Logged-in users can add/remove items to their wishlist. This is a protected route that updates the user model in MongoDB.
* **Dynamic Product Catalog:** Products are fetched from MongoDB, with pages for all products, search, filtering, and single product details.
* **Shopping Cart & Checkout:** Full cart functionality with checkout process and order management.
* **Admin Dashboard:** Protected admin routes with a dedicated login page for managing products and orders.
* **Image Upload:** Cloudinary integration for product image uploads.
* **Modern UI:** Built with Tailwind CSS and Framer Motion, featuring a clean, responsive, and minimalist design with smooth animations and dark mode support.
* **Backend API:** A complete RESTful API built with Node.js, Express, and Mongoose.
* **Environment-Based Configuration:** Dynamic API URLs for seamless development and production deployment.

---

## 🛠 Tech Stack

### Frontend
* **React 19** (with Vite / Rolldown)
* **React Router v7** (for page navigation)
* **React Context API** (for global state)
* **Tailwind CSS** (for styling)
* **Framer Motion** (for animations)
* **Axios** (for API requests)
* **@react-oauth/google** (for Google Sign-In)
* **react-toastify** (for notifications)
* **lucide-react** (for icons)

### Backend
* **Node.js**
* **Express v5** (for the REST API)
* **MongoDB** (with Mongoose) (for the database)
* **JWT (jsonwebtoken)** (for authentication)
* **bcryptjs** (for password hashing)
* **google-auth-library** (for Google OAuth token verification)
* **Cloudinary** (for image hosting)
* **Multer** (for file upload handling)
* **CORS** (configured for security)
* **dotenv** (for environment variables)

### AI / Chatbot
* **Mistral AI** (`mistral-small-latest` model via REST API)
* JSON mode for structured responses (product cards, outfit suggestions, comparisons)

---

## 📋 Prerequisites

Before running this project, make sure you have:
- **Node.js** (v18 or higher)
- **MongoDB** account (Atlas or local)
- **Cloudinary** account (for image uploads)
- **Mistral AI** API key (for the AI chatbot) — [Get one here](https://console.mistral.ai/)
- **Google Cloud** project with OAuth 2.0 credentials (for Google login) — [Set up here](https://console.cloud.google.com/)
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

# Then update the values in /client/.env
VITE_BACKEND_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id

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
   Add `VITE_BACKEND_URL` pointing to your backend URL and `VITE_GOOGLE_CLIENT_ID` with your Google OAuth client ID.

---

## 📁 Project Structure

```
tech-commerce/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminRoute.jsx       # Admin route guard
│   │   │   ├── CartModal.jsx        # Shopping cart modal
│   │   │   ├── ChatBot.jsx          # AI chatbot (Aura AI)
│   │   │   ├── Footer.jsx           # Site footer
│   │   │   ├── Header.jsx           # Navigation header
│   │   │   ├── Hero.jsx             # Homepage hero section
│   │   │   ├── Loading.jsx          # Loading spinner
│   │   │   ├── ProductCard.jsx      # Product display card
│   │   │   ├── ProductCreateModal.jsx # Admin product creation
│   │   │   ├── ProductPage.jsx      # Single product detail
│   │   │   └── Skeleton.jsx         # Loading skeleton
│   │   ├── pages/
│   │   │   ├── AboutPage.jsx        # About page
│   │   │   ├── CheckoutPage.jsx     # Checkout flow
│   │   │   ├── Homepage.jsx         # Landing page
│   │   │   ├── LoginPage.jsx        # User login (+ Google)
│   │   │   ├── MyOrdersPage.jsx     # Order history
│   │   │   ├── NewPage.jsx          # New arrivals
│   │   │   ├── OrderPage.jsx        # Single order detail
│   │   │   ├── RegisterPage.jsx     # User registration (+ Google)
│   │   │   ├── SearchPage.jsx       # Search results
│   │   │   ├── ShopPage.jsx         # Product catalog
│   │   │   ├── WishlistPage.jsx     # User wishlist
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx   # Admin overview
│   │   │       ├── AdminLoginPage.jsx   # Admin login
│   │   │       ├── OrderListPage.jsx    # Manage orders
│   │   │       ├── ProductEditPage.jsx  # Edit product
│   │   │       └── ProductListPage.jsx  # Manage products
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Authentication state
│   │   │   ├── CartContext.jsx      # Shopping cart state
│   │   │   ├── ThemeContext.jsx     # Dark/light mode
│   │   │   └── WishlistContext.jsx  # Wishlist state
│   │   ├── config/                  # API configuration
│   │   ├── assets/                  # Images and static files
│   │   ├── App.jsx                  # Root component + routing
│   │   ├── main.jsx                 # Entry point + providers
│   │   └── index.css                # Global styles
│   ├── .env                         # Frontend environment variables
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── vite.config.js               # Vite configuration
│   └── package.json
│
├── server/                          # Backend Node.js application
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   └── cloudinary.js            # Cloudinary config
│   ├── controllers/
│   │   ├── chatController.js        # AI chatbot logic (Mistral)
│   │   ├── orderController.js       # Order operations
│   │   ├── productController.js     # Product CRUD
│   │   └── userController.js        # Auth + Google OAuth
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── adminMiddleware.js       # Admin role check
│   ├── models/
│   │   ├── OrderModel.js            # Order schema
│   │   ├── ProductModel.js          # Product schema
│   │   └── UserModel.js             # User schema (+ Google ID)
│   ├── routes/
│   │   ├── chatRoutes.js            # POST /api/chat
│   │   ├── orderRoutes.js           # /api/orders
│   │   ├── productRoutes.js         # /api/products
│   │   ├── uploadRoutes.js          # /api/upload (Cloudinary)
│   │   └── userRoutes.js            # /api/users (+ Google login)
│   ├── utils/
│   │   └── generateToken.js         # JWT token helper
│   ├── data/                        # Seed data
│   ├── seeder.js                    # Database seeder
│   ├── server.js                    # Express app entry point
│   ├── vercel.json                  # Vercel deployment config
│   ├── .env                         # Backend environment variables
│   └── package.json
│
├── DEPLOYMENT_GUIDE.md              # Detailed deployment instructions
└── README.md                        # This file
```

---

## 🔑 Key Features Explained

### Authentication Flow
- User registers/logs in → JWT token generated
- Token stored in `localStorage`
- Protected routes check for valid token
- Admin routes require `isAdmin` flag

### Google OAuth Flow
- User clicks "Sign in with Google" → Google returns a credential token
- Frontend sends the token to `/api/users/google-login`
- Backend verifies the token using `google-auth-library`
- If the Google email matches an existing account, it links and logs in
- If no account exists, a new one is created (no password required)
- JWT token returned just like regular login

### AI Chatbot (Aura AI)
- Floating chat widget available on every page
- Powered by **Mistral AI** (`mistral-small-latest`) with JSON response mode
- Full product catalog injected as context so the AI only recommends real products
- Cart-aware: knows what the user has in their cart
- Supports conversation history for multi-turn interactions
- Structured responses include product cards, outfit banners, and comparison tables

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
| Variable | Description | Required |
|---|---|---|
| `PORT` | Backend port (default: `3000`) | ✅ |
| `MONGO_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | JWT signing secret | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |
| `MISTRAL_API_KEY` | Mistral AI API key (for chatbot) | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID | ✅ |
| `FRONTEND_URL` | Primary deployed frontend origin | ❌ |
| `FRONTEND_URLS` | Comma-separated extra frontend origins | ❌ |

Example:

```env
PORT=3000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/auraapparel
JWT_SECRET=my_super_secret_key
CLOUDINARY_CLOUD_NAME=my_cloud
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdefghijk
MISTRAL_API_KEY=your_mistral_api_key
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
FRONTEND_URL=https://auraapparel.vercel.app
FRONTEND_URLS=https://staging-auraapparel.vercel.app,http://localhost:5173
```

### Client (`client/.env`)
| Variable | Description | Required |
|---|---|---|
| `VITE_BACKEND_URL` | Backend base URL | ✅ |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID | ✅ |

Example:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

---

## 🔌 API Endpoints

### Users (`/api/users`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/users` | Register new user | ❌ |
| POST | `/api/users/login` | Login user | ❌ |
| POST | `/api/users/google-login` | Google OAuth login | ❌ |
| POST | `/api/users/wishlist` | Toggle wishlist item | ✅ |
| GET | `/api/users/wishlist` | Get user's wishlist | ✅ |

### Products (`/api/products`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/products` | Get all products | ❌ |
| GET | `/api/products/:id` | Get single product | ❌ |
| POST | `/api/products` | Create product | 🔒 Admin |
| PUT | `/api/products/:id` | Update product | 🔒 Admin |
| DELETE | `/api/products/:id` | Delete product | 🔒 Admin |

### Orders (`/api/orders`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/orders` | Create order | ✅ |
| GET | `/api/orders/myorders` | Get user's orders | ✅ |
| GET | `/api/orders/:id` | Get order by ID | ✅ |
| GET | `/api/orders` | Get all orders | 🔒 Admin |
| PUT | `/api/orders/:id/deliver` | Mark as delivered | 🔒 Admin |

### Chat (`/api/chat`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/chat` | Send message to AI | ❌ |

### Upload (`/api/upload`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/upload` | Upload image to Cloudinary | 🔒 Admin |

---

## 🛒 Frontend Routes

### Public Routes
| Path | Page | Description |
|---|---|---|
| `/` | Homepage | Landing page with hero and featured products |
| `/shop` | ShopPage | All products with category filtering |
| `/search/:keyword` | SearchPage | Search results |
| `/product/:id` | ProductPage | Product details |
| `/login` | LoginPage | User login (email + Google) |
| `/register` | RegisterPage | User registration (email + Google) |
| `/new` | NewPage | New arrivals |
| `/about` | AboutPage | About the brand |

### Protected User Routes
| Path | Page | Description |
|---|---|---|
| `/checkout` | CheckoutPage | Checkout flow |
| `/myorders` | MyOrdersPage | User's order history |
| `/order/:id` | OrderPage | Single order details |
| `/wishlist` | WishlistPage | User's saved items |

### Admin Routes
| Path | Page | Description |
|---|---|---|
| `/admin` | AdminLoginPage | Admin login |
| `/admin/login` | AdminLoginPage | Admin login (alternate) |
| `/admin/dashboard` | AdminDashboard | Admin overview dashboard |
| `/admin/products` | ProductListPage | Product management |
| `/admin/product/:id/edit` | ProductEditPage | Edit product |
| `/admin/orders` | OrderListPage | Order management |

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

### AI Chatbot Not Responding
- Verify `MISTRAL_API_KEY` is set in `server/.env`
- Check Mistral API quota and rate limits at [console.mistral.ai](https://console.mistral.ai/)
- The chatbot still works for FAQ if the database is unreachable (just without product recommendations)

### Google Login Not Working
- Ensure `GOOGLE_CLIENT_ID` is set in both `server/.env` and `client/.env` (`VITE_GOOGLE_CLIENT_ID`)
- Verify the OAuth 2.0 credentials in [Google Cloud Console](https://console.cloud.google.com/)
- Add `http://localhost:5173` to the authorized JavaScript origins in Google Cloud

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Pardeep Yadav**
- GitHub: [@pardeep1234567890](https://github.com/pardeep1234567890)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) — UI library
- [Express.js](https://expressjs.com/) — Backend framework
- [MongoDB](https://www.mongodb.com/) — Database
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Mistral AI](https://mistral.ai/) — AI chatbot
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Google OAuth](https://developers.google.com/identity) — Social login
- [Cloudinary](https://cloudinary.com/) — Image hosting
- [Vercel](https://vercel.com/) — Deployment

---

**Note:** This is a learning project demonstrating full-stack MERN development with modern best practices including AI integration, social authentication, environment-based configuration, secure authentication, and cloud deployment.
