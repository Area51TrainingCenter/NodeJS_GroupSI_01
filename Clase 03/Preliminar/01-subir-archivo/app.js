var express = require("express"),
	app = express(),
	path = require("path"),
	bodyParser = require("body-parser"),
	serveFavicon = require("serve-favicon"),
	favicon = __dirname + "/favicon.ico",
	directorioVistas = __dirname+"/vistas",
	directorioPublico = express.static(path.join(__dirname,"/publico")),
	motorVistas = "ejs",
	log = require("morgan"),
	rutas = require("./rutas/index"),
	puerto = process.env.port || 3000;

app.set("views", directorioVistas);
app.set("view engine", motorVistas);
app.set("puerto", puerto);

app.use(serveFavicon(favicon));
app.use(log("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(directorioPublico);
app.use(rutas);


module.exports = app;