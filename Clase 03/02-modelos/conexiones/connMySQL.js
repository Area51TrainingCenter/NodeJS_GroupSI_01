var mysql = require("mysql"),
	expressMyConnection = require("express-myconnection"),
	opciones = {
		user: "root",
		password: "123456",
		database: "peliculas",
		host: "localhost",
		port: 3306
	},
	miConexion = expressMyConnection(mysql, opciones, "request");

module.exports = miConexion;