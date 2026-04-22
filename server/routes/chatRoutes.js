import express from 'express';
import { chatWithAI } from '../controllers/chatController.js';

const router = express.Router();

// POST /api/chat
// No auth middleware — chatbot is available to all visitors
// Potential problem: Without auth, anyone can spam the endpoint.
// For production, consider adding rate limiting (e.g., express-rate-limit)
router.post('/', chatWithAI);

export default router;
