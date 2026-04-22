import { Router } from "express";
import { getMyWishlist, googleLogin, loginUser, registerUser, toggleWishlist } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router()

router.post("/",registerUser);
router.post("/login",loginUser);
router.post("/google-login", googleLogin);
router.route('/wishlist')
  .post(protect, toggleWishlist)
  .get(protect, getMyWishlist);

export default router ;