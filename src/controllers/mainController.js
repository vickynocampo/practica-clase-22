const fs = require('fs');
const { url } = require('inspector');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let visited = [];
		for (let i = 0; i < products.length; i++){
			if (products[i].category === "visited"){
				visited.push(products[i])
			}
		}

		let enOferta = [];
		for (let i = 0; i < products.length; i++){
			if (products[i].category === "in-sale"){
				enOferta.push(products[i])
			}
		}

		res.render("index", {visitados : visited, ofertas: enOferta})
	},
	
	search: (req, res) => {
		let urlBusqueda = req.query.searchForm;
		let resultadoBusqueda =[];
		for (let i = 0 ; i < products.length; i++){
			if (products[i].name == urlBusqueda){
				resultadoBusqueda.push(products[i]);
			}
		}
		res.render ("results", {resultadoBusqueda : resultadoBusqueda})
	},

};

module.exports = controller;