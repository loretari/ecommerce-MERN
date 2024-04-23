import express from "express";
import { Product } from "../models/Product.js";
import { verifyToken } from "../midlewares/verifyToken.js";

const productController = express.Router();

   //create a new product (admin)
   productController.post("/", async (req, res) => {

       try {
           const newProduct = await Product.create(req.body);
        return res.status(200).json(newProduct);

       } catch (error) {
           console.error("Error creating product:", error);
           return res.status(500).json(error.message)
       }
   })

  // update existing product
  productController.put('/:id', async (req, res) => {
      try {
          const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
          return res.status(200).json(updatedProduct);

      } catch (error) {
          return res.status(500).json(error.message)
      }
  })

     // delete product
    productController.delete('/:id', async (req, res) => {
        try {
          await Product.findByIdAndDelete(req.params.id)
            return res.status(200).json("Product successfully deleted")
        } catch (error) {
            return res.status(500).json(error.message)
        }
    })

  // get all products (everybody can see them)
  productController.get('/', async (req, res) => {
      const queryCat = req.query.category
      try {
          let products
          if (queryCat) {
              products = await Product.find({categories: queryCat });

          } else {
              products = await Product.find();
          }

          return res.status(200).json(products);

      } catch (error) {
          return res.status(500).json(error.message)
      }
  })

  // get all (only register user can see them)
  productController.get('/all', verifyToken, async (req, res) => {
      try {
          const products = await Product.find(req.query)
          return res.status(200).json(products);
      } catch (error) {
          return res.status(500).json(error.message)
      }
  })

// get admin (one (only register user can see them))
productController.get('user/find/:id', verifyToken, async  (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(200).json({ msg: "No product with such id!" })
        }
        return res.status(200).json(product)
    } catch (error)  {
        console.log(error)
    }
})

  // get single product
  productController.get('/find/:id', async (req, res) => {
      try {

          const product = await Product.findById(req.params.id);
          if (!product) {
              return res.status(404).json({error: "Product not found"});
          }
          return res.status(200).json(product);
      } catch (error) {
          return res.status(500).json({ error: error.message });
      }
})


 // get admin
   productController.get('/admin/find/:id', async (req, res) => {
       try {
           const product = await Product.findById(req.params.id);
           return res.status(200).json(product);
       } catch (error) {
           return res.status(500).json(error.message)
       }
   })




export default productController;