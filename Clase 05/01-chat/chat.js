module.exports = function(io){
	var listaUsuario = [];

	io.on("connection", function(socket){

		socket.emit("usuario conectado");
		socket.broadcast.emit("usuario conectado");

		function fnNombreUsuario(nombre){
			var datos = {id: socket.id, nombre: nombre};
			socket.nombre = nombre;

			listaUsuario.push(datos);
			console.log("Lista después de loguear");
			console.log(listaUsuario);
		}

		function fnDesconectarUsuario(){
			var datos = {id: socket.id, nombre: socket.nombre};
			listaUsuario.slice(listaUsuario.indexOf(datos), 1);
			console.log("Lista después de desconectar");
			console.log(listaUsuario);
		}

		socket.on("nombre usuario", fnNombreUsuario);
		socket.on("disconnect", fnDesconectarUsuario);

	})

}