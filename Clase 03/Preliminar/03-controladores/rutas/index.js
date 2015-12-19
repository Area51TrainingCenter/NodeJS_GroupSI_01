var express = require("express"),
	rutas = express.Router(),
	controlador = require("../controladores/controladorPelicula");


function fnNoEncontrada(req, res) {}


/*Rutas*/
rutas.get("/", controlador.listar);
rutas.get("/nueva", controlador.frmNuevo);
rutas.post("/nueva", controlador.insertar);
rutas.get("/eliminar/:id", controlador.eliminar);
rutas.get("/:id", controlador.editar);
rutas.post("/:id", controlador.grabar);

rutas.use(fnNoEncontrada);

module.exports = rutas;