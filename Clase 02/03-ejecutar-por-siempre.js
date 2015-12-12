/*
	FOREVER (npm install forever -g)
	- forever start <script.js>
	- forever list
	- forever stop <id>

	PM2 (npm install pm2 -g)
	- pm2 start <script.js>
	- pm2 list
	- pm2 stop <id>   ó  pm2 stop <script.js>
	- pm2 restart <id> ó pm2 restart <script.js>
	- pm2 kill <id> ó pm2 kill <script.js>
*/
var express = require("express"),
	app = express();

function fnHome(req, res) {
	res.send("Corriendo por siempre");
}

function fnListar(req, res) {
	var id = req.params.id;

	res.send("Valor de id: " + id);
}

function fnInicio() {
	console.log("Servidor corriendo en el puerto 3000");
}

app.get("/", fnHome);
app.get("/lista/:id", fnListar);
app.listen(3000, fnInicio);