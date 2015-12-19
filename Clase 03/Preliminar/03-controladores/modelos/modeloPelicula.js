var conexion = require("../conexiones/connMySQL"),
	modelo = function(){};


modelo.listar = function listar(cb){
	conexion.query("select * from pelicula", cb);
}

modelo.editar = function editar(idpelicula, cb) {
	conexion.query("select * from pelicula where idpelicula = ?", idpelicula, cb);
}

modelo.insertar = function insertar(datos, cb) {
	conexion.query("insert into pelicula set ?", datos, cb);
}

modelo.grabar = function grabar(datos, idpelicula, cb) {
	conexion.query("update pelicula set ? where idpelicula=?", [datos, idpelicula], cb);
}

modelo.eliminar = function editar(idpelicula, cb) {
	conexion.query("delete from pelicula where idpelicula = ?", idpelicula, cb);
}

module.exports = modelo;