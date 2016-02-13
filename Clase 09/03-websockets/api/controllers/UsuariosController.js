/**
 * UsuariosController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	listar: function(req, res) {
		Usuarios
			.find()
			.then(function(registros){

				if(req.isSocket) {
					Usuarios.subscribe(req, registros);
					Usuarios.watch(req);
				};
				
				res.json(registros);
			})
			.catch(function(err){
				res.negotiate(err);
			});
	},

	insertar: function(req, res) {
		var nombre = req.body.nombre;

		Usuarios
			.create({nombre: nombre})
			.then(function(registro){
				Usuarios.publishCreate(registro);
				res.ok();
			})
			.catch(function(err){
				res.negotiate(err);
			});
	},

	actualizar: function(req, res) {
		var nombre = req.body.nombre;
		var id = req.params.id;

		Usuarios
			.update({id: id}, {nombre: nombre})
			.then(function(registros){
				Usuarios.publishUpdate(registros[0].id, registros[0]);
			})
			.catch(function(err){
				res.negotiate(err);
			});	

		res.ok();		
	},

	eliminar: function(req, res) {
		var id = req.params.id;

		Usuarios
			.destroy({id: id})
			.then(function(registros){
				Usuarios.publishDestroy(registros[0].id);
			})
			.catch(function(err){
				res.negotiate(err);
			});	

		res.ok();		
	}	
	
};

