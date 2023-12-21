import express from "express";
import {
    createUser,
    userLogin,
    userUpdate,
} from "../controller/userController.js";
import { isSignedIn } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.post("/update", isSignedIn, userUpdate);

export { router as userRoute };
