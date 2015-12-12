/*
	SUPERVISOR (npm install supervisor -g)
	NODEMON (npm install nodemon -g)
*/
var express = require("express"),
	app = express();


function fnHome(req, res) {
	res.send("Hola a todos a la segunda clase");
}

function fnInicio() {
	console.log("Servidor corriendo en el puerto 3000");
}

app.get("/", fnHome);
app.listen(3000, fnInicio);