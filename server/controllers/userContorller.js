import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

const userController = express.Router();

// update user
userController.put('/:id', async (req, res) => {
    try {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req. body.password, 10);
    }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// delete an user
userController.delete('/:id', async (req, res) => {
    try {
       await User.findByIdAndDelete(req.params.id)
        return res.status(200).json("User successfully deleted")

    } catch (error) {
        return res.status(500).json(error.message);
    }
})

// get all user
userController.get('/', async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get single user (only admin)
userController.get('/admin/find/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    const { passwords, ...others } = user._doc;
    return res.status(200).json(others)
})

// save new user
userController.post('/saveUser', async (req, res) => {
    try {
       const hashedPassword = await bcrypt.hash(req.body.password, 10);
       const newUser = await User.create({ ...req.body, password: hashedPassword })
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json(error.message)
    }
})





export default userController;