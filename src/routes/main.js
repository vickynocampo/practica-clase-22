// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); //

//router.get('/', mainController.visitados); 

//router.get('/', mainController.enOferta); //

router.get('/search', mainController.search); 

module.exports = router;