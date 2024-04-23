import express from "express";
import dotenv from "dotenv";
import stripePackage from 'stripe';
dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SEC_KEY);

const stripePaymentController = express.Router();

stripePaymentController.post('/payment', (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    }, (stripeErr, stripeRes) => {
        if (stripeErr){
            res.status(500).json(stripeErr)
        } else {
            res.status(200),json(stripeRes)
        }
    })
})


export default stripePaymentController;


