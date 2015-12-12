/*
[
	{ruta:"", callback:cookieParser()},
	{ruta:"", callback:cookieSession({...})},
	{ruta:"", callback:fnLeerCookie(...)}	
]
*/


var express = require("express"),
	app = express(),
	cookieParser = require("cookie-parser"),
	cookieSession = require("cookie-session");

function fnHome(req, res) {
	if(req.session) {
		res.send("Corriendo por siempre");
	} else {
		res.redirect("/noautorizado");
	}
}

function fnNoAutorizado(req, res) {
	res.send("No autorizado");
}

function fnLeerCookie(req, res, next) {
	if(req.cookies.rol!="administrador") {
		req.session = null;
	} else {
		req.session = req.cookies;
	}
	next();
}

function fnInicio() {
	console.log("Servidor corriendo en el puerto 3000");
}

//   usuario=sergio&rol=administrador
/*   {
		usuario: "sergio",
		rol: "administrador"
	 }

	 response.cookies = {
		usuario: "sergio",
		rol: "administrador"
	 }
*/


app.use(cookieParser());
app.use(cookieSession({secret: "12345"}));
app.use(fnLeerCookie);

app.get("/", fnHome);
app.get("/noautorizado", fnNoAutorizado);


app.listen(3000, fnInicio);