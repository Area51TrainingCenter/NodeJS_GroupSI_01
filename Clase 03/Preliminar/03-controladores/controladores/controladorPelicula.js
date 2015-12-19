var modelo = require("../modelos/modeloPelicula"),
	controlador = function(){};

controlador.listar = function(req, res, next) {
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

controlador.editar = function(req, res, next) {
	var idpelicula = req.params.id;
	modelo.editar(idpelicula, function(err, registro){
		if(!err) {
			res.render("editar", {registro: registro[0]});
		} else {
			var data = {error: err};
			res.render("error", data);
		}
	});
}

controlador.insertar = function(req, res, next) {
	var data = {titulo: req.body.titulo, anno: req.body.anno};
	modelo.insertar(data, function(err) {
		if(!err) {
			res.redirect("/peliculas");
		} else {
			var data = {error: err};
			res.render("error", data);
		}	
	})
}

controlador.grabar = function(req, res, next) {
	var data = {titulo: req.body.titulo, anno: req.body.anno};
	var idpelicula = req.params.id;
	modelo.grabar(data, idpelicula, function(err) {
		if(!err) {
			res.redirect("/peliculas");
		} else {
			var data = {error: err};
			res.render("error", data);
		}	
	});
}

controlador.eliminar = function(req, res, next) {
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

controlador.frmNuevo = function(req, res, next) {
	res.render("nueva");
}

module.exports = controlador;