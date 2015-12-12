/*
	NODE-INSPECTOR (npm install node-inspector -g)
	
	Pasos (en una ventana negra diferente):
		1. node-inspector. Aparecerá una ruta. Es la ruta de la consola de depuración.
		2. node --debug <script.js>  ó supervisor --debug <script.js>
*/
var express = require("express"),
	app = express();

function fnHome(req, res) {
	res.send("Hola a todos a la segunda clase");
}

function fnListar(req, res) {
	var id = req.params.id;

	res.send("Valor de id: " + id);
}

function fnInicio() {
	console.log("Servidor corriendo en el puerto 3000");
}

app.get("/", fnHome);
app.get("/lista/:id", fnListar);
app.listen(3000, fnInicio);