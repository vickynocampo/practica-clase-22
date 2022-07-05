// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Multer Settings ************
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images/products"))
    },
    filename: (req, file, cb) => {
        console.log(file)
        let nombreImagen = "producto-" + Date.now() + path.extname(file.originalname);
        cb(null, nombreImagen)
    }
})

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);

/*** CREATE ONE PRODUCT ***/
let upload = multer({ storage: storage })

router.get('/create/', productsController.create);
router.post('/', upload.single("imagen"), productsController.store);

/*** GET ONE PRODUCT ***/
router.get('/:id/', productsController.detail);
router.get('/detail/:id/', productsController.detail);


/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit);
router.put('/:id', productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete('/:id', productsController.destroy);

module.exports = router;