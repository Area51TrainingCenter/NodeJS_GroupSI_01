module.exports = function(io) {
	io.on("connection", function(socket){

		function fnTrazo(x, y, tipo){
			socket.broadcast.emit("trazo hecho", x, y, tipo);
		}

		socket.on("trazo", fnTrazo);
	});
}