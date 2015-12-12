var express = require("express"),
	app = express(),
	path = require("path"),
	morgan = require("morgan"),
	serveFavicon = require("serve-favicon"),
	favicon = path.join(__dirname, "/favicon.ico"),
	motorVistas = "ejs",
	directorioVistas = path.join(__dirname, "/vistas"),
	directorioPublico = express.static(path.join(__dirname, "/publico")),
	rutas = require("./rutas/index"),
	puerto = 3000;

app.set("view engine", motorVistas);
app.set("views", directorioVistas);
app.set("puerto", puerto);

app.use(serveFavicon(favicon));
app.use(morgan("dev"));
app.use(directorioPublico);
app.use(rutas);

module.exports = app;