/**
 * MedicosController
 *
 * @description :: Server-side logic for managing medicos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	listar: function(req, res){
		Enfermeros
			.find()
			.then(function(registros){
				res.view("listarEnfermeros",{regs: registros})
			})
			.catch(function(err){
				res.negotiate(err);
			})
	},
	actualizar: function(req, res){
		var id = req.params.id;
		var nombreCompleto = req.body.nombreCompleto;

		Enfermeros
			.update({idEnfermero: id}, {nombreCompleto: nombreCompleto})
			.then(function(reg){
				res.redirect("/enfermeros/listar");
			})
			.catch(function(err){
				res.negotiate(err)
			})
	},
	eliminar: function(req, res){
		var id = req.params.id;

		Enfermeros
			.destroy()
			.where({idEnfermero: id})
			.then(function(reg){
				res.redirect("/enfermeros/listar");
			})
			.catch(function(err){
				res.negotiate(err)
			})			
	},
	editar: function(req, res){
		var id = req.params.id;

		Enfermeros
			.find()
			.where({idEnfermero: id})
			.then(function(registro){
				res.view("editarEnfermeros", {reg:registro});
			})
			.catch(function(err){
				res.negotiate(err)
			})				
	},
	insertar: function(req, res){
		var nombreCompleto = req.body.nombreCompleto;

		Enfermeros
			.create({nombreCompleto: nombreCompleto})
			.then(function(reg){
				res.redirect("/enfermeros/listar");
			})
			.catch(function(err){
				res.negotiate(err)
			})				
	}
};

		/*
			ruta = "/eliminar/:modelo/:id"

			var modelo = req.params.modelo;
			var id = req.params.id;
			var data = req.body.datos;

			var filtro = {id: id};

			var objModelo;
			switch(modelo) {
				case "medicos":
					objModelo = Medicos;
					break;
			};

			objModelo
				.destroy()
				.where(filtro)
				.then(function(reg){
	
				})
				.catch(function(err){
	
				})

			objModelo
				.update(filtro, data)
				.then(function(reg){
	
				})
				.catch(function(err){
	
				})				

		*/
