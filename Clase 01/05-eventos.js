/*var evento = require("events"),
	eventoEmiter = evento.EventEmitter;*/

var eventoEmitter = require("events").EventEmitter,
	pub = new eventoEmitter();

pub.on("mi propio evento", function(mensaje) {
	console.log(mensaje);
})

pub.once("mi propio evento", function() {
	console.log("=============");
})

pub.emit("mi propio evento", "Curso de NodeJS");
pub.emit("mi propio evento", "Profesor: Sergio Hidalgo");
pub.removeAllListeners();
pub.emit("mi propio evento", "Esto ya se muestra");