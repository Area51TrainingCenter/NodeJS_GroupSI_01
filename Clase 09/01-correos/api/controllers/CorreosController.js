/**
 * CorreosController
 *
 * @description :: Server-side logic for managing correos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	enviarTexto: function(req, res){
		var dominio = sails.config.correosSetting.dominio;
		var apiKey = sails.config.correosSetting.apiKey;
		var datos  = {
			to: "sergiohidalgocaceres@gmail.com",
			from: sails.config.correosSetting.remitente,
			subject: "Correo de SailsJS",
			text: "Mensaje incluido en el correo"
		};

		var mailgun = require("mailgun-js")({apiKey: apiKey, domain: dominio });

		mailgun.messages().send(datos, function(err, mensaje){
			if(err) {
				res.negotiate(err);
			}
			console.log(mensaje);
		});

		res.ok();
	},

	enviarHTML: function(req, res){
		var dominio = sails.config.correosSetting.dominio;
		var apiKey = sails.config.correosSetting.apiKey;
		var datos  = {
			to: "sergiohidalgocaceres@gmail.com",
			from: sails.config.correosSetting.remitente,
			subject: "Correo de SailsJS",
			html: "<b>Mi nombre es Sergio</b>"
		};

		var mailgun = require("mailgun-js")({apiKey: apiKey, domain: dominio });

		mailgun.messages().send(datos, function(err, mensaje){
			if(err) {
				res.negotiate(err);
			}
			console.log(mensaje);
		});

		res.ok();
	},

	enviarReporteHTML: function(req, res){
		var dominio = sails.config.correosSetting.dominio;
		var apiKey = sails.config.correosSetting.apiKey;

		var tabla = "";
		tabla += "<table>";
		tabla += "<tr><th>Usuario</th><th>Hora</th></tr>";
		tabla += "<tr><td>Sergio</td><td>9:34 am</td></tr>";
		tabla += "<tr><td>Andrea</td><td>10:05 am</td></tr>";
		tabla += "</table>";

		var datos  = {
			to: "sergiohidalgocaceres@gmail.com",
			from: sails.config.correosSetting.remitente,
			subject: "Correo de SailsJS",
			html: tabla
		};

		var mailgun = require("mailgun-js")({apiKey: apiKey, domain: dominio });

		mailgun.messages().send(datos, function(err, mensaje){
			if(err) {
				res.negotiate(err);
			}
			console.log(mensaje);
		});

		res.ok();
	}
	
};

