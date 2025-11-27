import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js"
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS with specific configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'https://auraapparel.vercel.app'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// A simple test route
app.get('/', (req, res) => {
  res.send('Aura Apparel API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));