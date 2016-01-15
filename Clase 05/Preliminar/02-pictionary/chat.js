module.exports = function(io) {

	io.on("connection", function(socket){
		console.log("Usuario conectado");

		socket.on("trazo", function(x, y, tipo){
			socket.broadcast.emit("dibujar en canvas", x, y, tipo);
		});

		socket.on("accion", function(accion){
			socket.broadcast.emit("ejecutar accion", accion);
		});


	})
}