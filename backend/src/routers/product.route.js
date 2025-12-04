import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllProduct } from "../controllers/admin.controller.js";
import { getProductById } from "../controllers/product.controller.js";

const router = Router();

router.get("/", protectRoute, getAllProduct);
router.get("/:id", protectRoute, getProductById);

export default router;
