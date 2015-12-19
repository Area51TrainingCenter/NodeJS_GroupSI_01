var express = require('express');
var router = express.Router();
var formidable = require("formidable");
var fs = require("fs-extra");
var util = require("util");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('subir');
});

router.post("/subir", function(req, res, next){

	function fnRecibidos(err, campos, archivos) {
		res.send("Archivos recibidos: " + util.inspect({files: archivos}));
	}

	function fnAvance(recibidos, total) {
		console.log("Avance: " + recibidos/total*100);
	}	

	function fnError(err) {
		console.log(err);
	}	

	function fnFin(campos, archivos) {
		var rutaTemporal = this.openedFiles[0].path,
			nombreArchivo = this.openedFiles[0].name,
			nuevoDirectorio = "./public/uploads/";

		function fnCopiado(err) {
			if(err) {
				console.log(err);
			} else {
				res.redirect("/");
			}
		}

		fs.copy(rutaTemporal, nuevoDirectorio + nombreArchivo, fnCopiado)			
	}

	var form = formidable.IncomingForm();

	form.parse(req, fnRecibidos);
	form.on("progress", fnAvance);
	form.on("error", fnError);
	form.on("end", fnFin);

})



module.exports = router;
