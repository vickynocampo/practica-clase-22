const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {res.render("products", { productos : products})}, 

	detail: (req, res) => {	
		let productId = parseInt(req.params.id, 10);
		let productoEncontrado = " ";
		for (let i = 0; i < products.lentgh; i++ ){
		if (products[i].id === productId){
				productoEncontrado = products[i];
		}	
		} res.render( "detail",  {producto: productoEncontrado} )},

	create: (req, res) => {res.render("product-create-form")},
	
	store: (req, res) => {
		let productoNuevo = {
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
		}
		res.redirect("/products")
		console.log(productoNuevo)
	},

	// Update - Form to edit
	edit: (req, res) => {res.send("edit")}
			// Do the magic
	,
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
			let productId = parseInt(req.params.id, 10);
			for (let i = 0; i < products.length; i++) {
				if ( products[i].id === menuId ) {
					products.splice(i, 1)
				}
			}
			res.send(`se ha borrado la opcion de menu con id ${productId}`);
		}    
};

module.exports = controller;