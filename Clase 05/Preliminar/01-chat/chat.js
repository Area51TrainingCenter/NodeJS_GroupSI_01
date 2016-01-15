module.exports = function(io) {
	var listaUsuarios = [];
	io.on("connection", function(socket){
		console.log("Ocurrió una conexión");

		function fnDatosUsuario() {
			return {usuario: socket.usuario, id: socket.id};
		}

		function fnAgregarUsuario(usuario) {
			socket.usuario = usuario;

			listaUsuarios.push(fnDatosUsuario());

			socket.emit("agregado ok", usuario);
			socket.broadcast.emit("nuevo usuario", usuario, socket.id);
			socket.emit("lista usuarios", {lista: listaUsuarios});
		}

		function fnEnviarMensaje(mensaje, usuarioId) {
			if(usuarioId=="") {
				socket.broadcast.emit("mensaje enviado", socket.usuario + ": " + mensaje);	
			} else {
				socket.broadcast.to(usuarioId).emit("mensaje enviado", socket.usuario + ": " + mensaje);	
			}
			
		}

		function fnDesconectar(){
			listaUsuarios.splice(listaUsuarios.indexOf(fnDatosUsuario()), 1);
			socket.broadcast.emit("usuario desconectado", socket.usuario, socket.id);
		}

		socket.on("usuario agregar", fnAgregarUsuario);
		socket.on("enviar mensaje", fnEnviarMensaje);
		socket.on("disconnect", fnDesconectar);
	});
}