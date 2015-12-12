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

	console.log(datos);	

	var usuarioValido = false;

	usuarios.forEach(function(usuario){
		if(usuario.usuario == datos.usuario && usuario.contrasena==datos.contrasena) {
		 	usuarioValido = true;
		}
	});


	if(usuarioValido) {
		req.session.usuario = datos;
		res.redirect("/listado");
	} else {
		req.session.usuario = null;
		res.redirect("/noautorizado");
	}	
}

function fnListado(req, res) {
	if(req.session.usuario==null) {
		res.redirect("/noautorizado");
	};

	res.send("Usuario autorizado para ver el listado");
}

function fnNoAutorizado(req, res) {
	res.send("Usted no está autorizado");
}

function fnDesloguear(req, res) {
	req.session.usuario = null;
	res.redirect("/login");
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
rutas.get("/listado", fnListado);
rutas.get("/noautorizado", fnNoAutorizado);
rutas.get("/logout", fnDesloguear);

rutas.use(fnRutaNoEncontrada);

module.exports = rutas;