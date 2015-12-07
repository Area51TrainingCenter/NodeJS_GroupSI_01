var http = require("http").createServer(),
	fs = require("fs");

function servidorEjecutandose() {
	console.log("Servidor corriendo en el puerto 3000");
}

function servidor(req, res) {
	function archivoLeido(err, contenido) {
		if(err) {
			console.log(err);
			res.writeHead(501, {"Content-type": "text/html"});
			res.end("<h1>Ocurrió un error</h1>");
		} else {
			res.writeHead(200, {"Content-type": "text/html"});
			res.end(contenido);	
		}
	}

	fs.readFile("./index.html", archivoLeido);
}

http
	.on("request", servidor)
	.listen(3000, servidorEjecutandose);