var conexion = require("../conexiones/connMySQL");

var modelo = function(){};

modelo.insertar = function(objUsuario, cb){
	conexion.query("insert into usuarios set ?", objUsuario, cb)	
}

modelo.validar = function(id, cb) {
	conexion.query("select * from usuarios where id=?", id, cb);
}

module.exports = modelo;