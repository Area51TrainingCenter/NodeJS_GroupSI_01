var conexion = require("../conexiones/connMySQL");

var modelo = function(){};

modelo.listar = function(cb){
	conexion.query("select * from pelicula", cb)	
}

modelo.insertar = function(objPelicula, cb){
	conexion.query("insert into pelicula set ? ", objPelicula, cb)	
}

modelo.detalle = function(idPelicula, cb) {
	conexion.query("select * from pelicula where idpelicula = ?", idPelicula, cb);
}

modelo.editar = function(objPelicula, idPelicula, cb){
	conexion.query("update pelicula set ? where idpelicula = ? ", [objPelicula, idPelicula] , cb)	
}
modelo.eliminar = function(idPelicula, cb){
	conexion.query("delete from pelicula where idpelicula = ? ", idPelicula , cb)	
}

module.exports = modelo;