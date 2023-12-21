import { prisma } from "../config/prismaConfig.js";

export const createCategory = async (req, res) => {
    try {
        const { category } = req.body;

        const categoryExist = await prisma.category.findUnique({
            where: { category },
        });

        if (!categoryExist) {
            const newCategory = await prisma.category.create({
                data: {
                    category,
                },
            });

            return res.status(201).send({
                success: true,
                message: "Category created",
                category: newCategory,
            });
        } else {
            return res.status(200).send({
                success: false,
                message: "Category already exist",
            });
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

export const getAllCategory = async (req, res) => {
    try {
        const allCategories = await prisma.category.findMany();
        res.status(200).send({ allCategories });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getACategory = async (req, res) => {
    try {
        const { category } = req.query;

        const products = await prisma.category.findUnique({
            where: { category },
            include: {
                product: true,
            },
        });

        return res.status(200).send({
            products,
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
