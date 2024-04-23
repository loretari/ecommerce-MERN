import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userController from "./controllers/userContorller.js";
import authController from "./controllers/authController.js";
import cartController from "./controllers/cartController.js";
import productController from "./controllers/productController.js";
import uploadController from "./controllers/uploadContorller.js";
import itemController from "./controllers/itemController.js";
import employeeController from "./controllers/employeeController.js";
import orderController from "./controllers/orderController.js";
import stripePaymentController from "./controllers/stripePaymentController.js";

const app = express();

// connect db
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB is successfully connected");
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${process.env.PORT}`)
        })
    })


app.use(cors({
    origin: 'https://eclectic-duckanoo-a18e26.netlify.app',
    credentials: true,
    optionsSuccessStatus: 200,
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userController);
app.use('/auth', authController);
app.use('/carts', cartController);
app.use('/products', productController);
app.use('/images', express.static('public/images'));
app.use('/avatars', express.static('public/avatars'))
app.use('/upload', uploadController);
app.use('/item', itemController);
app.use('/admin', employeeController);
app.use('/orders', orderController);
app.use('/stripe', stripePaymentController);



