io.socket.on("connect", function(){
	io.socket.get("/observar");

	io.socket.on("usuarios", function(evento){
		console.log(evento);
	})	
})

