var express = require("express"),
	rutas = express.Router();

function fnHome(req, res) {
	res.send("Home")
}

function fnLogin(req, res) {
	res.send("Login");
}

function fnRutaNoEncontrada(req, res, next) {
/*	res.writeHead(404, {"content-type": "text/html"});
	res.end("<h1>Ruta no encontrada</h1>");
*/
	var error = new Error();
	error.status = 404;

	var info = {
		titulo: "Página no encontrada",
		error: error
	}
	res.render("error", info);

}

rutas.get("/", fnHome);
rutas.get("/login", fnLogin);

rutas.use(fnRutaNoEncontrada);

module.exports = rutas;