import express from "express";
import { createOrder, getAllOrders } from "../controller/orderController.js";
import { isSignedIn } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/create", isSignedIn, createOrder);
router.get("/all", getAllOrders);

export { router as orderRoute };
