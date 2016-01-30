/**
 * MedicosController
 *
 * @description :: Server-side logic for managing medicos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	listar: function(req, res){
		Medicos
			.find()
			.then(function(registros){
				res.view("listarMedicos",{regs: registros, layout: "base"})
			})
			.catch(function(err){
				res.negotiate(err);
			})
	},
	actualizar: function(req, res){
		var id = req.params.id;
		var nombreCompleto = req.body.nombreCompleto;

		Medicos
			.update({idMedico: id}, {nombreCompleto: nombreCompleto})
			.then(function(reg){
				res.redirect("/medicos/listar");
			})
			.catch(function(err){
				res.negotiate(err)
			})
	},
	eliminar: function(req, res){
		var id = req.params.id;

		Medicos
			.destroy()
			.where({idMedico: id})
			.then(function(reg){
				res.redirect("/medicos/listar");
			})
			.catch(function(err){
				res.negotiate(err)
			})			
	},
	editar: function(req, res){
		var id = req.params.id;

		Medicos
			.find()
			.where({idMedico: id})
			.then(function(registro){
				res.view("editarMedicos", {reg:registro, layout: "base"});
			})
			.catch(function(err){
				res.negotiate(err)
			})				
	},
	insertar: function(req, res){
		var nombreCompleto = req.body.nombreCompleto;

		Medicos
			.create({nombreCompleto: nombreCompleto})
			.then(function(reg){
				res.redirect("/medicos/listar");
			})
			.catch(function(err){
				res.negotiate(err)
			})				
	}
};

