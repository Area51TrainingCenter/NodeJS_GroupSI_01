var express = require("express"),
	app = express(),
	path = require("path"),
	motorVistas = "ejs",
	directorioVistas = path.join(__dirname, "/vistas"),
	directorioPublico = express.static(path.join(__dirname, "/publico")),
	rutas = require("./rutas/index");

function fnInicio() {
	console.log("Servidor corriendo en el puerto 3000");
}

app.set("view engine", motorVistas);
app.set("views", directorioVistas);

app.use(directorioPublico);
app.use(rutas);

app.listen(3000, fnInicio);