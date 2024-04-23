import express from "express";
import multer from "multer";
import path from "path";


const uploadController = express.Router();

const storage = multer.diskStorage({

    destination: './public/images',
    filename: (req, file, cb) => {
        const filename = `product_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
    }

});

const upload = multer({
    storage: storage
    // same as storage: storage

})

uploadController.post('/image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({error: "No file uploaded"})
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    return res.json({ success: 1, image_url: imageUrl });


});

const avatarStorage = multer.diskStorage({
    destination: './public/avatars',
    filename: (req, file, cb) => {
        const filename = `avatar_${Date.now()}${path.extname(file.originalname)}`
        cb(null, filename);
    }
})
const avatarUpload = multer({
    storage: avatarStorage
    // same as storage: storage

})

uploadController.post('/avatar',  avatarUpload.single('avatar'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({error: "No file uploaded"})
    }


    const avatarUrl = `${req.protocol}://${req.get('host')}/avatars/${req.file.filename}`;
    return res.json({ success: 1, avatar_url: avatarUrl });


})

export default uploadController;