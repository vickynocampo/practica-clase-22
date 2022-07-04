const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {res.render("products", { productos : products})}, 

	detail: (req, res) => {
        const productId = parseInt(req.params.id,10);
        let productFounded = "";
        for (let i=0; i<=products.length; i++) {
            if (products[i].id === productId) {
                productFounded = products[i]
                res.render("detail", {producto: productFounded})
            } 
        }
    },

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

	edit: (req, res) => {
		const productId = parseInt(req.params.id,10);
        let productToEdit = "";
        for (let i=0; i<=products.length; i++) {
            if (products[i].id === productId) {
                productToEdit = products[i]
                res.render("product-edit-form", {productToEdit: productToEdit})
            } 
        }
	},

	update: (req, res) => {
		let idUrl = req.params.id;
		for (let i = 0; i < products.length; i++){
			if(products[i].id == idUrl){
				products[i].name = req.body.name,
				products[i].price = req.body.price,
				products[i].discount = req.body.discount
				products[i].category = req.body.category,
				products[i].description = req.body.description
				}
			 } res.redirect("/products")
	},
		
	destroy : (req, res) => {/*res.send("hola eliminar")*/
			let productId = parseInt(req.params.id, 10);
			for (let i = 0; i < products.length; i++) {
				if ( products[i].id === productId ) {
					products.splice(i, 1)
				}
			}
			res.send(`se ha borrado el producto id ${productId}`);
		}    
	}

module.exports = controller;