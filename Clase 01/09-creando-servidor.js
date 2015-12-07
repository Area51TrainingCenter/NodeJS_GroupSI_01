var http = require("http").createServer();

function servidor(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	res.end("<h1>Todo esta ok</h1>");
	/*response.write("<h1>Todo esta ok</h1>");
	response.end();*/
	console.log("ok");
}

function servidorEjecutandose() {
	console.log("Servidor corriendo en el puerto 3000");
}

http
	.on("request", servidor)
	.listen(3000, servidorEjecutandose);