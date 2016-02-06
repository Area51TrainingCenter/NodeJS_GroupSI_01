module.exports = {
	listar: function(req, res){
		Usuarios
			.find()
			.then(function(registros){
				res.json(registros);
			})
			.catch(function(err){
				res.negotiate(err);
			});
	},

	editar: function(req, res){
		var id = req.params.id;
		var filtro = {id: id};

		Usuarios
			.find()
			.where(filtro)
			.then(function(registros){
				res.json(registros);
			})
			.catch(function(err){
				res.negotiate(err);
			});		
	},

	actualizar: function(req, res) {
		var id = req.params.id;

		var nombres = req.body.nombres;
		var apellidos = req.body.apellidos;

		var filtro = {id: id};
		var data = {nombres: nombres, apellidos: apellidos};

		Usuarios
			.update(filtro, data)
			.then(function(registros){
				res.ok();
			})
			.catch(function(err){
				res.negotiate(err);
			});
	},

	insertar: function(req, res) {
		var nombres = req.body.nombres;
		var apellidos = req.body.apellidos;

		console.log(req.allParams());

		var data = {nombres: nombres, apellidos: apellidos};

		Usuarios
			.create(data)
			.then(function(registros){
				res.ok();
			})
			.catch(function(err){
				res.negotiate(err);
			});
	},

	eliminar: function(req, res) {
		var id = req.params.id;
		var filtro = {id: id};

		Usuarios
			.destroy()
			.where(filtro)
			.then(function(registros){
				res.ok();
			})
			.catch(function(err){
				res.negotiate(err);
			});			
	}

}