var express = require("express"),
	app = express();

function servidorEjecutandose() {
	console.log("Servidor Ejecutandose en el puerto 3000");
}

function fnHome(req, res) {
	res.sendFile(__dirname + "/home.html");
	//res.end("<h1>Home</h1>");
}

function fnDetalle(req, res) {
	res.sendFile(__dirname + "/detalle.html");
}

function fnCriticas(req, res) {
	res.sendFile(__dirname + "/criticas.html");
}

function fnTrailers(req, res) {
	res.sendFile(__dirname + "/trailers.html");
}

function fnArea51(req, res){
	res.redirect("http://area51.pe");
}

function fnReservada(req, res) {
	res.redirect("/");
}

app.get("/", fnHome);
app.get("/detalle", fnDetalle);
app.get("/criticas", fnCriticas);
app.get("/trailers", fnTrailers);
app.get("/area51", fnArea51);
app.get("/reservada", fnReservada);


app.listen(3000, servidorEjecutandose);