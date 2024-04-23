import React, { useState } from "react"
import "./newItem.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import { addItemFailure, addItemSuccess } from "../../redux/itemSlice"

const NewItem = () => {
  const [title, setTitle] = useState("")
  const [cost, setCost] = useState("")
  const [quantity, setQuantity] = useState("")
  const [image, setImage] = useState("")
  const [previewImage, setPreviewImage] = useState(null)
  const [categories, setCategories] = useState("")
  const [inStock, setInStock] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(e.target.files[0])

    const reader = new FileReader()
    reader.onload = (event) => {
      setPreviewImage(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleClick = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("cost", cost)
      formData.append("quantity", quantity)
      formData.append("image", image)
      formData.append("categories", categories)
      formData.append("inStock", inStock)

      const uploadResponse = await axios.post(
        "https://mern-ecommerce-app-clqa.onrender.com/upload/image",
        formData
      )

      if (!uploadResponse.data || !uploadResponse.data.image_url) {
        throw new Error("Image URL is not provided in the response")
      }

      const itemData = {
        title,
        cost,
        quantity,
        image: uploadResponse.data.image_url,
        categories,
        inStock,
      }

      const response = await axios.post("https://mern-ecommerce-app-clqa.onrender.com/item", itemData)

      const item = response.data
      console.log(item)

      dispatch(addItemSuccess(item))
      navigate(`/admin/items`)
    } catch (error) {
      console.log(error.message)
      dispatch(addItemFailure(error))
    }
  }

  return (
    <div className='user'>
      <Link to="/admin/home" className="userAddButton">
        Back
      </Link>
      <div className='newProduct'>
        <h1>New Product</h1>
        <form
          className='addProductForm'
          onSubmit={handleClick}
          encType='multipart/form-data'
        >
          <div className='addProductItem'>
            <label>Image</label>
            <input
              type='file'
              id='image'
              placeholder='Image...'
              onChange={handleImageChange}
            />
            <img id='image' src={previewImage} alt='Preview' />
          </div>
          <div className='addProductItem'>
            <label>Title:</label>
            <input
              type='text'
              name='title'
              placeholder=''
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='addProductItem'>
            <label>Category:</label>
            <select
              name='categories'
              type='text'
              placeholder=''
              onChange={(e) => setCategories(e.target.value)}
            >
              <option value='bags'>Bags</option>
              <option value='clothing'>Clothing</option>
              <option value='jewelry'>Jewelry</option>
              <option value='accessories'>Accessories</option>
              <option value='beauty'>Beauty</option>
              <option value='shoes'>Shoes</option>
            </select>
          </div>

          <div className='addProductItem'>
            <label>Cost ($):</label>
            <input
              name='cost'
              type='number'
              placeholder=''
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <div className='addProductItem'>
            <label>Quantity:</label>
            <input
              name='quantity'
              type='number'
              placeholder=''
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className='addProductItem'>
            <label>In Stock:</label>
            <select name='inStock' onChange={(e) => setInStock(e.target.value)}>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>
          <button className='addProductButton'>Create</button>
        </form>
      </div>
    </div>
  )
}

export default NewItem
