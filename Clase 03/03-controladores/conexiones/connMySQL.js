var mysql = require("mysql"),
	opciones = {
		user: "root",
		password: "123456",
		database: "peliculas",
		host: "localhost",
		port: 3306
	},
	miConexion = mysql.createConnection(opciones);
	miConexion.connect(function(err){
		if(err) {
			console.log(err.stack);
		} else {
			console.log("Id de proceso: " + miConexion.threadId);
		}
	})

module.exports = miConexion;