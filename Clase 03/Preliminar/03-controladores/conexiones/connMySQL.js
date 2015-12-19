var mysql = require("mysql"),
	opciones = {
		host: "localhost",
		port: 3306,
		user: "root",
		password: "malaquias",
		database: "peliculas"
	};

var miConexion = mysql.createConnection(opciones);
miConexion.connect(function(err){
	if(err) {
		console.log("Error: " + err.stack);
	} else {
		console.log("Id Proceso MySQL: " + miConexion.threadId);
	}
});

module.exports = miConexion;