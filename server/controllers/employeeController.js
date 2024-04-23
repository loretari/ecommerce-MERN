import express from "express";
import {Employee} from "../models/Employee.js";


const employeeController = express.Router();

// update employee
employeeController.put('/employee/:id', async (req, res) => {
    try{
        const updateEmp = await Employee.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        return res.status(200).json(updateEmp);

    } catch (error) {
        return res.status(500).json(error.message);
    }
})

// delete an employee
employeeController.delete('/employee/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        return res.status(200).json("Employee successfully deleted")
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get all employees
employeeController.get('/employee', async (req, res) => {
    try {
        const employee = await Employee.find();
        return res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

// get single employee
employeeController.get('/employee/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        return res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

employeeController.post('/employee', async (req, res) => {
    const newEmp = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mail: req. body.mail,
        salary: req.body.salary,
        phone: req.body.phone,
        role: req.body.role
    })
    if(!req.body.firstName || !req.body.mail || !req.body.salary || !req.body.phone || !req.body.lastName) {
        return  res.status(500).json("Missing value!");
    }

    try {
        const saveUser = await newEmp.save();
        return res.status(200).json(saveUser);
    } catch (error) {
        return res.status(500).json(error.message)

    }
})

export default employeeController;