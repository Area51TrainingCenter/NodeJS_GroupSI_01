var express = require("express"),
	rutas = express.Router();

function fnHome(req, res) {
	res.send("Home")
}

function fnLogin(req, res) {
	res.render("login");
}

function fnIngresar(req, res) {
	var usuarios = [
		{usuario: 'sergio', contrasena: '12345'},
		{usuario: 'monica', contrasena: '12345'},
		{usuario: 'andrea', contrasena: '12345'},
		{usuario: 'pepe', contrasena: '12345'},
	];

	var datos = {
			usuario : req.body.usuario,
			contrasena : req.body.contrasena
		};

	var usuarioValido = false;

	usuarios.forEach(function(usuario){
		if(usuario.usuario == datos.usuario && usuario.contrasena==datos.contrasena) {
		 	usuario.usuarioValido = true;
		}
	});

	if(usuarioValido) {
		req.session = datos;
		res.redirect("/listado");
	} else {
		req.session = null;
		res.redirect("/noautorizado");
	}	
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
rutas.post("/ingresar", fnIngresar);

rutas.use(fnRutaNoEncontrada);

module.exports = rutas;