var express = require('express');
var router = express.Router();
var controlador = require("../controladores/controladorPelicula");

router.get("/", controlador.listar);
router.get("/editar-form/:id", controlador.editarForm);
router.post("/editar/:id", controlador.editar);
router.get("/insertar-form", controlador.insertarForm);
router.post("/insertar", controlador.insertar);
router.get("/eliminar/:id", controlador.eliminar);

module.exports = router;
