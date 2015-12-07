var http = require("http"),
	url = require("url"),
	querystring = require("querystring");

function servidorEjecutandose(){
	console.log("Servidor ejecutándose en el puerto 3000");
}

function servidor(req, res) {
	console.log("req.url = " + req.url);
	console.log("url.parse = " + JSON.stringify(url.parse(req.url)));
	console.log("url.parse.query = " + url.parse(req.url).query);
	console.log("querystring.parse = " + querystring.parse(url.parse(req.url).query));
	console.log("json = " + JSON.stringify(querystring.parse(url.parse(req.url).query)));

	res.writeHead(200, {"Content-type": "text/plain"});
	res.end("Todo Ok");
}

http
	.createServer(servidor)
	.listen(3000, servidorEjecutandose);	