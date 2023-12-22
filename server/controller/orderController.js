import { prisma } from "../config/prismaConfig.js";

export const createOrder = async (req, res) => {
    try {
        const { user } = req;

        const { amount, products } = req.body;

        const order = await prisma.order.create({
            amount,
            products,
            status: "Ok",
            deliveryStatus: "Pending",
            user: {
                connect: {
                    id: user.id,
                },
            },
        });

        return res.status(201).send({
            success: true,
            message: "Order placed successfully",
            order,
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
