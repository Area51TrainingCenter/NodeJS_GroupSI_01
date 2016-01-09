var modelo = require("../modelos/modeloPelicula");

var controlador = function(){};

controlador.insertar = function(req, res, next){
	var data = {
		titulo: req.body.titulo,
		anno: req.body.anno
	};

	modelo.insertar(data, function(err) {
		if(!err) {
			res.redirect("/peliculas");
		} else {
			var data = {error: err};
			res.render("error", data);
		}
	})
}

controlador.listar = function(req, res, next){
	modelo.listar(function(err, registros){
		if(!err) {
			var data = {registros: registros};
			res.render("listado", data);	
		} else {
			var data = {error: err};
			res.render("error", data);
		}
	});	
}

controlador.editar = function(req, res, next){
	var idpelicula = req.params.id;
	var data = {
		titulo: req.body.titulo,
		anno: req.body.anno
	};

	modelo.editar(data, idpelicula, function(err, registro){
		if(!err) {
			res.redirect("/peliculas");
		} else {
			var data = {error: err};
			res.render("error", data);
		}
	});	
}
controlador.eliminar = function(req, res, next){
	var idpelicula = req.params.id;
	modelo.eliminar(idpelicula, function(err){
		if(!err) {
			res.redirect("/peliculas");
		} else {
			var data = {error: err};
			res.render("error", data);
		}	
	});	
}

controlador.insertarForm = function(req, res, next){
	res.render("nueva");
}
controlador.editarForm = function(req, res, next){
	var idpelicula = req.params.id;
	modelo.detalle(idpelicula, function(err, registro){
		if(!err) {
			res.render("editar", {registro: registro[0]});
		} else {
			var data = {error: err};
			res.render("error", data);
		}
	});		
}

module.exports = controlador;