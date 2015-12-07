var relojExportar = (function() {

	var eventos = require("events").EventEmitter,
		herencia = require("util").inherits;

	function Reloj() {
		self = this;

		setInterval(function(){
			self.emit("actualizar hora");
		},1000);

		self.mostrarHora = function(){
			var fechaHora = new Date();

			var horas = self.agregarCeros(fechaHora.getHours());
			var minutos = self.agregarCeros(fechaHora.getMinutes());
			var segundos = self.agregarCeros(fechaHora.getSeconds());

			var tiempo = horas +  ":" + minutos + ":" + segundos;

			console.log(tiempo);
		}

		self.agregarCeros = function(numero) {
			if(numero<10) {
				return "0" + numero;
			} else {
				return numero;
			}
		}
	}

	herencia(Reloj, eventos);

	return new Reloj();
})();

module.exports = relojExportar;