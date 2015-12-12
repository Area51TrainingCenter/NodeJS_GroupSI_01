var express = require("express"),
	app = express(),
	path = require("path"),
	motorVistas = "ejs",
	directorioVistas = __dirname + "/vistas",
	directorioPublico = path.join(__dirname, "/publico");


function fnHome(req, res) {
	res.render("home");
}

function fnContacto(req, res) {
	res.render("contacto");
}

function fnInicio() {
	console.log("Corriendo en puerto 3000");
}

app.set("views", directorioVistas);
app.set("view engine", motorVistas);

app.use(express.static(directorioPublico));

app.get("/", fnHome);
app.get("/contacto", fnContacto);

app.listen(3000, fnInicio);
