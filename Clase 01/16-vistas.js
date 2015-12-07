var express = require("express"),
	app = express(),
	directorioVistas = __dirname + "/vistas",
	motorVistas = "ejs";

function servidorEjecutandose() {
	console.log("Servidor corriendo en el puerto 3000");
}

function fnHome(req, res) {
	res.render("home");
}

function fnDetalle(req, res) {
	var id = req.params.id;
	var datos = {
		id: id,
		titulo: "La Gran Estafa",
		actores: [
			"George Cloony",
			"Brad Pitt",
			"Matt Daemon",
			"Julia Roberts"
		]
	}

	res.render("detalle", datos);
}

function fnCriticas(req, res) {
	res.render("criticas");	
}

function fnTrailers(req, res) {
	res.render("trailers");	
}


app.set("views", directorioVistas);
app.set("view engine", motorVistas);

app.get("/", fnHome);
app.get("/detalle/:id", fnDetalle);
app.get("/criticas", fnCriticas);
app.get("/trailers", fnTrailers);

app.listen(3000, servidorEjecutandose);