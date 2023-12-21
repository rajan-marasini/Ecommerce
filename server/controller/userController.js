import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaConfig.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await prisma.user.findUnique({ where: { email } });

        if (!userExist) {
            const hashedPassword = await hashPassword(password);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            return res.status(201).send({
                success: true,
                message: "Successfully Registered",
                user,
            });
        } else {
            return res.status(200).send({
                success: false,
                message: "User Already Exists",
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success: false,
            message: "Internal Sever error",
            error: error.message,
        });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            const matchPassword = await comparePassword(
                password,
                user.password
            );

            if (matchPassword) {
                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                );

                delete user.password;

                res.status(200)
                    .cookie("token", token, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true,
                    })
                    .send({
                        success: true,
                        message: "Login successful",
                        user,
                    });
            } else {
                res.send({ success: false, message: "invalid creadential" });
            }
        } else {
            res.send({ success: false, message: "invalid creadential" });
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const userUpdate = async (req, res) => {
    try {
        const { user } = req;

        const { phone, address, image } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                address,
                phone,
                image,
            },
        });

        return res.status(200).send({
            success: true,
            message: "Successfully updated",
            updatedUser,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
