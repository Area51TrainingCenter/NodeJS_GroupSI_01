/**
 * MedicosController
 *
 * @description :: Server-side logic for managing medicos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	listar: function(req, res){
		Diagnostico
			.find()
			.then(function(registros){
				res.view("listarDiagnostico",{regs: registros})
			})
			.catch(function(err){
				res.negotiate(err);
			})
	},
	actualizar: function(req, res){
		var id = req.params.id;
		var nombreDiagnostico = req.body.nombreDiagnostico;

		Diagnostico
			.update({idDiagnostico: id}, {nombreDiagnostico: nombreDiagnostico})
			.then(function(reg){
				res.redirect("/diagnosticos/listar");
			})
			.catch(function(err){
				res.negotiate(err)
			})
	},
	eliminar: function(req, res){
		var id = req.params.id;

		Diagnostico
			.destroy()
			.where({idDiagnostico: id})
			.then(function(reg){
				res.redirect("/diagnosticos/listar");
			})
			.catch(function(err){
				res.negotiate(err)
			})			
	},
	editar: function(req, res){
		var id = req.params.id;

		Diagnostico
			.find()
			.where({idDiagnostico: id})
			.then(function(registro){
				res.view("editarDiagnostico", {reg:registro});
			})
			.catch(function(err){
				res.negotiate(err)
			})				
	},
	insertar: function(req, res){
		var nombreDiagnostico = req.body.nombreDiagnostico;

		Diagnostico
			.create({nombreDiagnostico: nombreDiagnostico})
			.then(function(reg){
				res.redirect("/diagnosticos/listar");
			})
			.catch(function(err){
				res.negotiate(err)
			})				
	}
};


