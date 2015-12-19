var express = require("express"),
	rutas = express.Router(),
	modeloPelicula = require("../modelos/modeloPelicula");


/*Funciones Callback*/
function fnListadoPeliculas(req, res) {
	req.getConnection(function(err, modeloPelicula){
		if(!err) {
			modeloPelicula.query("select * from pelicula", function(err, registros) {
				if(!err) {
					var data = {registros: registros};
					res.render("listado", data);	
				} else {
					var data = {error: err};
					res.render("error", data);
				}
			});
		} else {
			var data = {error: err};
			res.render("error", data);
		}	
	})
}
function fnFormEditarPelicula(req, res) {
	req.getConnection(function(err, modeloPelicula){
		if(!err) {
			var idpelicula = req.params.id;
			modeloPelicula.query("select * from pelicula where idpelicula = ?", idpelicula, function(err, registro){
				if(!err) {
					res.render("editar", {registro: registro[0]});
				} else {
					var data = {error: err};
					res.render("error", data);
				}
			})
		} else {
			var data = {error: err};
			res.render("error", data);
		}	
	});	
}
function fnGrabarPelicula(req, res) {
	req.getConnection(function(err, modeloPelicula){
		if(!err) {
			var data = {titulo: req.body.titulo, anno: req.body.anno};
			var idpelicula = req.params.id;
			modeloPelicula.query("update pelicula set ? where idpelicula = ?", [data, idpelicula], function(err){
				if(!err) {
					res.redirect("/peliculas");
				} else {
					var data = {error: err};
					res.render("error", data);
				}
			})
		} else {
			var data = {error: err};
			res.render("error", data);
		}	
	});	
}
function fnFormNuevaPelicula(req, res) {
	res.render("nueva");
}
function fnNuevaPelicula(req, res) {
	req.getConnection(function(err, modeloPelicula){
		if(!err) {
			var data = {titulo: req.body.titulo, anno: req.body.anno};
			modeloPelicula.query("insert into pelicula set ?", data, function(err){
				if(!err) {
					res.redirect("/peliculas");
				} else {
					var data = {error: err};
					res.render("error", data);
				}
			})
		} else {
			var data = {error: err};
			res.render("error", data);
		}	
	});
}
function fnEliminarPelicula(req, res) {
	req.getConnection(function(err, modeloPelicula){
		if(!err) {
			var idpelicula = req.params.id;
			modeloPelicula.query("delete from pelicula where idpelicula = ?", idpelicula, function(err){
				if(!err) {
					res.redirect("/peliculas");
				} else {
					var data = {error: err};
					res.render("error", data);
				}
			})
		} else {
			var data = {error: err};
			res.render("error", data);
		}			
	});
}

function fnNoEncontrada(req, res) {}


/*Rutas*/

rutas.use(modeloPelicula);

rutas.get("/", fnListadoPeliculas);
rutas.get("/nueva", fnFormNuevaPelicula);
rutas.post("/nueva", fnNuevaPelicula);
rutas.get("/eliminar/:id", fnEliminarPelicula);
rutas.get("/:id", fnFormEditarPelicula);
rutas.post("/:id", fnGrabarPelicula);
rutas.use(fnNoEncontrada);

module.exports = rutas;