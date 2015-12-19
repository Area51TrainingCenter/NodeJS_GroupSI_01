var express = require('express');
var router = express.Router();
var modelo = require("../modelos/modeloPelicula");

function fnListado(req, res) {
	req.getConnection(function(err, adaptador){
		if(err) {
			console.log("Ocurrió un error: " + err.stack);
		} else {
			adaptador.query("select * from pelicula", function(err, registros) {
				if(err) {
					console.log("Error de consulta = " + err.stack);
				} else {
					var data = {registros: registros};
					res.render("listado", data);
				}
			})
		}
	});
}

fnAgregarForm = function(req, res) {
	res.render("frmAgregar");
}

fnAgregar = function(req, res) {
	req.getConnection(function(err, adaptador){
		if(err) {
			console.log("Ocurrió un error: " + err.stack);
		} else {
			var datos = {
				titulo: req.body.titulo,
				anno: req.body.anno
			}
			adaptador.query("insert into pelicula set ? ", datos , function(err, registros) {
				if(err) {
					console.log("Error de inserción = " + err.stack);
				} else {
					res.redirect("/peliculas");
				}
			})
		}
	});
}

function fnEditarForm(req, res) {
	req.getConnection(function(err, adaptador){
		if(err) {
			console.log("Ocurrió un error: " + err.stack);
		} else {
			var idpelicula = req.params.id;
			adaptador.query("select * from pelicula where idpelicula = ?", idpelicula, function(err, registros) {
				if(err) {
					console.log("Error de consulta = " + err.stack);
				} else {
					var data = {registro: registros[0]};
					res.render("frmEditar", data);
				}
			})
		}
	});
}

fnEditar = function(req, res) {
	req.getConnection(function(err, adaptador){
		if(err) {
			console.log("Ocurrió un error: " + err.stack);
		} else {
			var datos = {
				titulo: req.body.titulo,
				anno: req.body.anno
			};
			var idpelicula = req.params.id;

			adaptador.query("update pelicula set ? where idpelicula = ? ", [datos, idpelicula] , function(err) {
				if(err) {
					console.log("Error de edicion = " + err.stack);
				} else {
					res.redirect("/peliculas");
				}
			})
		}
	});
}

fnEliminar = function(req, res) {
	req.getConnection(function(err, adaptador){
		if(err) {
			console.log("Ocurrió un error: " + err.stack);
		} else {
			var idpelicula = req.params.id;

			adaptador.query("delete from pelicula where idpelicula = ? ", idpelicula , function(err) {
				if(err) {
					console.log("Error de eliminación = " + err.stack);
				} else {
					res.redirect("/peliculas");
				}
			})
		}
	});
}


router.use(modelo);

router.get("/", fnListado);
router.get("/agregar-form", fnAgregarForm);
router.post("/agregar", fnAgregar);
router.get("/editar-form/:id", fnEditarForm);
router.post("/editar/:id", fnEditar);
router.get("/eliminar/:id", fnEliminar);

module.exports = router;
