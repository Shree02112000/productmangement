const multer = require('multer')
const path = require('path')


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (file.mimetype == "image/png"||file.mimetype=="imagge/jpg") {
            callback(null, true)
        } else {
            callback(new Error("Image format is not supported"))
        }
    },
    limits: { fileSize: 1024 * 1024 * 2 }
})

module.exports = upload

