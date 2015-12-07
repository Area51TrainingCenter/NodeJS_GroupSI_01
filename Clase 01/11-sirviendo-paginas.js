var http = require("http").createServer(),
	fs = require("fs"),
	path = require("path"),
	urls = [
		{ruta: "detalle", archivo: "./detalle.html"},
		{ruta: "trailers", archivo: "./trailers.html"},
		{ruta: "home", archivo: "./home.html"},
		{ruta: "criticas", archivo: "./criticas.html"}
	];

function servidorEjecutandose() {
	console.log("Servidor corriendo en el puerto 3000");
}

function servidor(req, res) {
	console.log("req.url = " + req.url);
	console.log("path.basename = " + path.basename(req.url));

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

	var rutaUrl = path.basename(req.url);

	urls.forEach(function(item){
		if(item.ruta==rutaUrl) {
			fs.readFile(item.archivo, archivoLeido);
		}
	});

	if(!res.finished) {
		res.writeHead(404, {"content-type": "text/html"});
		res.end("<h1>Ruta no encontrada</h1>");
	}
}

http
	.on("request", servidor)
	.listen(3000, servidorEjecutandose);