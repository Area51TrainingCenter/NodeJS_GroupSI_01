angular
	.module("app", [])
	.controller("controlador", ["$http", "$scope", function($http, $scope){
		this.usuarios;
		var ref = this;

		$http
			.get("/usuarios/listar")
			.then(
				function(respuesta){
					ref.usuarios = respuesta.data;
					ref.usuarios.forEach(function(item){
						item.edicion=false;
						item.actualizado=false;
					});
				}, 
				function(err){
					alert(err);
				}
			);

		this.grabar = function(usuario) {
			$http
				.put("/usuarios/actualizar/" + usuario.id, usuario)
		}

		io.socket.get("/usuarios/listar");

		io.socket.on("usuarios", function(respuesta){
			var registro = respuesta.data;

			$scope.$apply(function(){
				ref.usuarios.forEach(function(usuario) {
					if(usuario.id==registro.id) {
						usuario.nombre = registro.nombre;
						usuario.actualizado = true;
					}
				})
			});


		});		


	}])