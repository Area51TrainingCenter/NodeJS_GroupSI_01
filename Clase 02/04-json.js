var express = require("express"),
	app = express();

function fnHome(req, res) {
	res.send("Corriendo por siempre");
}

function fnListar(req, res) {
	var datos = {
		nombre: "Sergio",
		apellido: "Hidalgo"
	};

	res.json(datos);
}

function fnListaTotal(req, res){
	var registros = [
		{usuario: "Usuario01", contrasena: "Contrasena01"},
		{usuario: "Usuario02", contrasena: "Contrasena02"},
		{usuario: "Usuario03", contrasena: "Contrasena03"},
		{usuario: "Usuario04", contrasena: "Contrasena04"}
	];

	res.json(registros);
}

function fnInicio() {
	console.log("Servidor corriendo en el puerto 3000");
}

app.get("/", fnHome);
app.get("/lista/:id", fnListar);
app.get("/lista", fnListaTotal);
app.listen(3000, fnInicio);