import express from "express";
import {
    createProduct,
    deleteProduct,
    getAProduct,
    getAllProducts,
    updateStock,
} from "../controller/productController.js";
import { isAdmin, isSignedIn } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/create", isSignedIn, isAdmin, createProduct);
router.get("/get-all-products", getAllProducts);
router.get("/get-a-product/:id", getAProduct);
router.put("/updateStock/:id", isSignedIn, isAdmin, updateStock);
router.delete("/delete/:id", isSignedIn, isAdmin, deleteProduct);

export { router as productRoute };
