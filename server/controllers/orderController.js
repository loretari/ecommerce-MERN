import express from "express";
import { Order } from "../models/Order.js";
import { verifyTokenAuth } from "../midlewares/verifyToken.js";


const orderController = express.Router();

// create a new cart (everyone can create that)
orderController.post('/', async (req, res) => {
    try {
        const newOrder = await Order.create(req.body);
        return res.status(200).json(newOrder);
    } catch (error) {
        return res.status(500).json({error: "Internal server error. Failed to create order."})

    }
})

// update existing order (only admin can)
orderController.put('/:id', async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// delete order
orderController.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" }); // Jei užsakymas nerastas, grąžinkite 404 statusą (Not Found)
        }
        return res.status(200).json("Order successfully deleted!")

    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get all orders (only admin)
orderController.get('/',  async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get user orders
orderController.get('/find/:userId', verifyTokenAuth, async (req, res) => {
    try {
        const orders = await Order.findOne({userId: req.params.userId});
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

export default orderController;