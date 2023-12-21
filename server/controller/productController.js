import { prisma } from "../config/prismaConfig.js";

export const createProduct = async (req, res) => {
    try {
        const { name, price, brand, description, inStock, category, images } =
            req.body;

        const product = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                description,
                brand,
                inStock,
                images,
                category: {
                    connect: {
                        category: category,
                    },
                },
            },
        });

        return res.status(201).send({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                category: {
                    select: {
                        category: true,
                    },
                },
            },
        });

        return res.status(200).send({ products });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success: false,
            message: "Something  went wrong",
            error: error.message,
        });
    }
};

export const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { inStock } = req.body;

        const resp = await prisma.product.update({
            where: { id },
            data: {
                inStock,
            },
        });

        return res.status(200).send({
            success: true,
            message: "Stock status updated",
            resp,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await prisma.product.delete({ where: { id } });

        return res.status(200).send({
            success: true,
            message: "Product deleted successfully",
            result,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
