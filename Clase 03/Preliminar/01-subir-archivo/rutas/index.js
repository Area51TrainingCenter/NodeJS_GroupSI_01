var express = require("express"),
	rutas = express.Router(),
	util = require("util"),
	formidable = require("formidable"),
	fs   = require("fs-extra");

function fnHome(req, res) {
	res.render("home");
}

function fnContacto(req, res) {
	res.render("contactos");
}

function fnLogin(req, res) {
	res.render("login");
}

function fnAutenticado(req, res) {
	console.log("Nombre: " + req.body.usuario);
	console.log("Contraseña: " + req.body.contrasena);

	res.send("Autenticado");
}

function fnSubir(req, res) {
	res.render("subir");
}

function fnPublicado(req, res){
	var form = formidable.IncomingForm();

	function fnRecibidos(err, campos, archivos) {
		res.send("Archivos recibidos: " + util.inspect({files: archivos}));
	}

	function fnAvance(enviados, total) {
		console.log("Avance: " + enviados/total*100);
	}

	function fnError(err) {
		console.log(err);
	}

	function fnFin(campos, archivos) {
		var rutaTemporal = this.openedFiles[0].path,
			nombreArchivo = this.openedFiles[0].name,
			nuevoDirectorio = "./publico/publicado/";

		function fnCopiado(err) {
			if(err) {
				console.log(err);
			}
		}

		fs.copy(rutaTemporal, nuevoDirectorio + nombreArchivo, fnCopiado)			
	}

	form.parse(req, fnRecibidos);
	form.on("progress", fnAvance);
	form.on("error", fnError);
	form.on("end", fnFin);
}

function fnNoEncontrada(req, res, next){
	//res.writeHead(404, {"content-type": "text/html"});
	//res.end("<h1>No Encontrada</h1>");

	var error = new Error();
	error.status = 404;

	var datos = {
		titulo:"Error 404",
		descripcion: "Recurso no encontrado",
		error: error
	}

	res.render("error", datos);

	next();
}

rutas.get("/", fnHome);
rutas.get("/contacto", fnContacto);
rutas.get("/login", fnLogin);
rutas.post("/autenticado", fnAutenticado);
rutas.get("/subir", fnSubir);
rutas.post("/publicado", fnPublicado);

rutas.use(fnNoEncontrada);

module.exports = rutas;