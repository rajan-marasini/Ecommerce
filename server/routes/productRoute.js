import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    updateStock,
} from "../controller/productController.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/get-all-products", getAllProducts);
router.put("/updateStock/:id", updateStock);
router.delete("/delete/:id", deleteProduct);

export { router as productRoute };
