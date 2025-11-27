import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {addOrderItems, getOrderById, getOrders, updateOrderToDelivered, getMyOrders, updateOrderToPaid} from "../controllers/orderController.js"
import { isAdmin } from "../middleware/adminMiddleware.js";
const router = Router();

router.route("/")
        .post(protect,addOrderItems)
        .get(protect,isAdmin,getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);
router.route('/:id/pay').put(protect, isAdmin, updateOrderToPaid);
export default router;