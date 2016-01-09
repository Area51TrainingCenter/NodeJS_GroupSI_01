var conn = require("../conexiones/connMySQL");

var modelo = {
	validar: function(usuario, contrasena, cb){
		conn.query("select id, usuario, contrasena, nombre from usuarios where usuario = ? and contrasena = ?", [usuario, contrasena], cb);
	},

	detalle: function(id, cb) {
		conn.query("select nombre from usuarios where id=?", id, cb);
	}
};

module.exports = modelo;