var cookieParser = require("cookie-parser"),
	cookieSession = require("cookie-session"),
	express = require("express"),
	app = express();

function fnVisitas(req, res) {
	req.session.cantidadVisitas || (req.session.cantidadVisitas = 0);

	req.session.cantidadVisitas++;

	res.end("Cantidad Visitas = " + req.session.cantidadVisitas);
}

function fnEjecutando() {
	console.log("Servidor corriendo en el puerto 3000");
}


app.use(cookieParser());
app.use(cookieSession({secret: "abcdefg"}));

app.get("/", fnVisitas);
app.listen(3000, fnEjecutando);
