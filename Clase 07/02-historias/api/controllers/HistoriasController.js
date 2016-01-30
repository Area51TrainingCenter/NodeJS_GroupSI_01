/**
 * HistoriasController
 *
 * @description :: Server-side logic for managing historias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	listar: function(req, res){
		var regHistorias, regMedicos, regEnfermeros, regDiagnosticos;
		Historias
			.find()
			.populate("medico")
			.populate("enfermero")
			.populate("diagnostico")
			.then(function(registros){
				regHistorias = registros;

				return Medicos.find()
			})
			.then(function(registros){
				regMedicos = registros;

				return Enfermeros.find();
			})
			.then(function(registros){
				regEnfermeros = registros;

				return Diagnostico.find();
			})
			.then(function(registros){
				regDiagnosticos = registros;

				res.view("listarHistorias", {
					layout: "base",
					regHistorias: regHistorias,
					regMedicos: regMedicos,
					regEnfermeros: regEnfermeros,
					regDiagnosticos: regDiagnosticos
				})
			})
			.catch(function(err){
				res.negotiate(err);
			})
	},
	actualizar: function(req, res){},
	eliminar: function(req, res){},
	editar: function(req, res){},
	insertar: function(req, res){}	
};

