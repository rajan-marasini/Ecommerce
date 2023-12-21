import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaConfig.js";

export const isSignedIn = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) return res.send({ message: "no token" });

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id },
        });

        delete user.password;

        req.user = user;

        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success: false,
            message: "Internal server errro",
            error: error.message,
        });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const { user } = req;

        if (user.role === "Admin") {
            next();
        } else {
            return res.send({ message: "Unauthorized Access" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
