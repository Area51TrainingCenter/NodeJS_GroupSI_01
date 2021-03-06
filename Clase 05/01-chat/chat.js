module.exports = function(io){
	var listaUsuario = [];

	io.on("connection", function(socket){

		socket.emit("usuario conectado");
		socket.broadcast.emit("usuario conectado");

		function fnNombreUsuario(nombre){
			var datos = {id: socket.id, nombre: nombre};
			socket.nombre = nombre;

			listaUsuario.push(datos);
			socket.emit("usuario aceptado", listaUsuario);
			socket.broadcast.emit("usuario agregado", datos);
		}

		function fnDesconectarUsuario(){
			var datos = {id: socket.id, nombre: socket.nombre};
			listaUsuario.slice(listaUsuario.indexOf(datos), 1);
			console.log("Lista después de desconectar");
			console.log(listaUsuario);
			socket.broadcast.emit("usuario desconectado", datos);
		}

		function fnMensajeUsuario(mensaje, usuarioId) {
			console.log(socket.nombre + ": " + mensaje);
			if(usuarioId) {
				socket.broadcast.to(usuarioId).emit("mensaje enviado",socket.nombre + ": " + mensaje);
			} else {
				socket.broadcast.emit("mensaje enviado",socket.nombre + ": " + mensaje);
			}
			
		}

		socket.on("nombre usuario", fnNombreUsuario);
		socket.on("disconnect", fnDesconectarUsuario);
		socket.on("mensaje usuario", fnMensajeUsuario);

	})

}