import express from "express";
import { prisma } from "../config/prismaConfig.js";
import { createOrder, getAllOrders } from "../controller/orderController.js";
import { isSignedIn } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/create", isSignedIn, createOrder);
router.get("/all-orders", getAllOrders);

router.get("/delete", async (req, res) => {
    const resp = await prisma.order.deleteMany();
    res.send({ resp });
});

export { router as orderRoute };
