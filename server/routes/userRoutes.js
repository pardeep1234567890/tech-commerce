import { Router } from "express";
import { loginUser, registerUser, toggleWishlist } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router()

router.post("/",registerUser);
router.post("/login",loginUser);
router.post("/wishlist",protect,toggleWishlist);

export default router ;