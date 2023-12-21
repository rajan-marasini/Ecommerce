import express from "express";
import {
    createCategory,
    getACategory,
    getAllCategory,
} from "../controller/categoryController.js";

const router = express.Router();

router.post("/create", createCategory);
router.get("/get", getACategory);
router.get("/all-categories", getAllCategory);

export { router as categoryRoute };
