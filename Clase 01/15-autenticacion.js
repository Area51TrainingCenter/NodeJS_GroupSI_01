var cookieParser = require("cookie-parser"),
	cookieSession = require("cookie-session"),
	path = require("path"),
	url = require("url"),
	querystring = require("querystring");
	express = require("express"),
	app = express();

function fnLogin(req, res) {
	res.sendFile(path.join(__dirname, "/login.html"));
}

function fnLogueo(req, res) {
	var datos = querystring.parse(url.parse(req.url).query);

	if(datos.usuario == "admin" && datos.contrasena == "123") {
		req.session.usuario = datos;
	}

	if(req.session.usuario){
		res.sendFile(path.join(__dirname, "/logueo.html"));
	} else {
		res.redirect("/");
	}
}

function fnLogout(req, res) {
	req.session.usuario = null;
	res.redirect("/");
}

function fnEjecutando() {
	console.log("Servidor corriendo en el puerto 3000");
}

app.use(cookieParser());
app.use(cookieSession({secret: "abcdefg"}));

app.get("/", fnLogin);
app.get("/logueo", fnLogueo);
app.get("/logout", fnLogout);
app.listen(3000, fnEjecutando);
