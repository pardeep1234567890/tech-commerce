import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getRazorpayKey,
  createRazorpayOrder,
  verifyPayment,
} from '../controllers/paymentController.js';

const router = Router();

// Public — frontend needs the key to initialize Razorpay checkout
router.get('/key', getRazorpayKey);

// Protected — only logged-in users can create payment orders
router.post('/order', protect, createRazorpayOrder);

// Protected — verify payment after Razorpay callback
router.post('/verify', protect, verifyPayment);

export default router;
