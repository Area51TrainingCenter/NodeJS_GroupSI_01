/**
 * UsuariosController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `UsuariosController.listar()`
   */
  listar: function (req, res) {
    res.view("lista", {nombre:"Sergio Hidalgo", layout: "base"});
  },

  formInsertar: function(req, res){
  	res.view("formularioInsertar", {layout:"base"});
  },

  insertar: function(req, res) {
  	var nombres = req.body.nombres;
  	var apellidos = req.body.apellidos;

  	Usuarios
  		.create({nombres: nombres, apellidos: apellidos})
  		.then(function(registros){
  			res.redirect("/formulario");
  		})
  		.catch(function(err){
  			res.negotiate(err);
  		})
  },

  observar: function(req, res) {
  	Usuarios
  		.find()
  		.then(function(reg){
		  	if(req.isSocket) {
		  		Usuarios.subscribe(req.socket, reg);
		  		Usuarios.watch(req.socket);
		  	}; 		
		  	res.ok();	
  		})

  	
  	// res.writeHead(200, {"content-type": "text/plain" });
  	// res.end("ok");
  }
};

