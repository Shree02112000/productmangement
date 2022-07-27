const express = require("express");
const router = express.Router();
const Controller = require('../controller/productController')
const upload = require('../middleware/upload')

router.post("/upload", function(req, res) {
    upload.single('uploadImages')(req, res, function(error) {
        if (error) {
            return res.json({ error: "Error occured while uploading image" })
        }
        res.status(200).json({ message: "Image Uploaded Successfully", ImageUrl: `http://localhost:8000/${req.file.path}` })
    })
})


router.post("/add",  Controller.createProduct)
router.get('/search', Controller.searchProduct)
router.get('/:id', Controller.getProduct)
router.put('/update/:id', Controller.updateProduct)
router.delete('/delete/:_id', Controller.softDeleteProduct)



module.exports = router;