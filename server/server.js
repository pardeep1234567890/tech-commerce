import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js"
import productRoutes from './routes/productRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

// A simple test route
app.get('/', (req, res) => {
  res.send('Aura Apparel API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users',userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));