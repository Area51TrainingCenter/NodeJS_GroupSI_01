var conexion = require("../conexiones/connMySQL");

var modelo = function(){};

modelo.insertar = function(objUsuario, cb){
	conexion.query("insert into usuariosredes set ?", objUsuario, cb)	
}

modelo.validar = function(id, cb) {
	conexion.query("select * from usuariosredes where idusuario=?", id, cb);
}

module.exports = modelo;