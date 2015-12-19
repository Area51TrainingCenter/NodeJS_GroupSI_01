var mysql = require("mysql"),
	opciones = {
		host: "localhost",
		port: 3306,
		user: "root",
		password: "malaquias",
		database: "peliculas"
	},
	miConexion = require("express-myconnection"),
	conexion = miConexion(mysql, opciones, "request");

module.exports = conexion;