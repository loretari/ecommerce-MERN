import express from "express";
import { Item } from "../models/Item.js";

const itemController = express.Router();

  // update item
  itemController.put('/:id', async (req, res) => {
      try {
        const updateItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).json(updateItem);
      } catch (error) {
          return res.status(500).json(error.message)
      }
  })

// delete an item
itemController.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        return res.status(200).json("Item successfully deleted")
    } catch (error) {
        return res.status(500).json(error.message)

    }
});

// get all items

itemController.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        return res.status(500).json(error.message)
    }
});

// get single item
itemController.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json(error.message)
    }
});

// create a new item
itemController.post('/', async (req, res) => {
   try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    return res.status(201).json(savedItem);


    } catch (error) {
        return res.status(500).json(error.message)

    }
})



export default itemController;