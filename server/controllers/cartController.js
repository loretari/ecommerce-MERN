import express from "express";
import { Cart } from "../models/Cart.js";
import { verifyToken, verifyTokenAdmin, verifyTokenAuth } from "../midlewares/verifyToken.js";


   const cartController = express.Router();

    // create a new cart (everyone can create that)
  cartController.post('/', verifyToken, async (req, res) => {
    const cart = new Cart(req.body);
    try {
        const newCart = await cart.save();
        return res.status(200).json(newCart);

    } catch  (error) {
        return res.status(500).json(error.message)
    }

})

   // updated existing cart
   cartController.put('/:id', verifyTokenAuth, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).json(updatedCart)

    } catch (error) {
        return res.status(500).json(error.message)
    }
  })


   // delete cart
      cartController.delete('/:id', verifyTokenAuth, async (req, res) => {
    try {
        await Cart.findOneAndDelete(req.params.id)
        return res.status(200).json("Cart successfully deleted!")

    } catch (error) {
        return res.status(500).json(error.message)
    }
})


    //get all carts (only admin)
    cartController.get('/', verifyTokenAdmin, async (req, res) => {
    try {
        //req.query = {quantity: 2}
        const carts = await Cart.find();
        return res.status(200).json(carts)
    } catch (error) {
        return res.status(500).json(error.message)
    }
   })

  // get one user cart
   cartController.get('/find/:userId', verifyTokenAuth, async (req, res) => {
    try {
        if (req.params.userId !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to access this resource." });
        }

        const cart = await Cart.findOne({userId: req.params.userId});
        return res.status(200).json(cart)
    } catch (error) {
        return res.status(500).json(error.message)
    }

   })








   export default cartController;



