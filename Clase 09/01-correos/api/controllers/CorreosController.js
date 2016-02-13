/**
 * CorreosController
 *
 * @description :: Server-side logic for managing correos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require("fs");
var ejs = require("ejs");
var EJS2 = require("ejs2");

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
	},

	enviarReporteVista: function(req, res){
		var dominio = sails.config.correosSetting.dominio;
		var apiKey = sails.config.correosSetting.apiKey;

		fs.readFile("views/reportevista.ejs", "utf-8", function(err, contenido){

			var datos  = {
				to: "sergiohidalgocaceres@gmail.com",
				from: sails.config.correosSetting.remitente,
				subject: "Correo de SailsJS",
				html: contenido
			};

			var mailgun = require("mailgun-js")({apiKey: apiKey, domain: dominio });

			mailgun.messages().send(datos, function(err, mensaje){
				if(err) {
					res.negotiate(err);
				}
				console.log(mensaje);
			});


		})


		res.ok();
	},	

	enviarReporteVistaConDatos: function(req, res){
		var dominio = sails.config.correosSetting.dominio;
		var apiKey = sails.config.correosSetting.apiKey;

		fs.readFile("views/reportevistadatos.ejs", "utf-8", function(err, contenido){

			var lista = [
				{usuario: "Sergio", hora: "9:00am"},
				{usuario: "Javier", hora: "10:02am"},
				{usuario: "Ana", hora: "4:03pm"},
				{usuario: "Marisol", hora: "4:33pm"},
				{usuario: "Evelyn", hora: "11:01pm"}
			];

			var html = ejs.render(contenido, {registros: lista});

			var datos  = {
				to: "sergiohidalgocaceres@gmail.com",
				from: sails.config.correosSetting.remitente,
				subject: "Correo de SailsJS",
				html: html
			};

			var mailgun = require("mailgun-js")({apiKey: apiKey, domain: dominio });

			mailgun.messages().send(datos, function(err, mensaje){
				if(err) {
					res.negotiate(err);
				}
				console.log(mensaje);
			});


		})


		res.ok();
	},

	enviarReporteVistaEJS2: function(req, res){
		var dominio = sails.config.correosSetting.dominio;
		var apiKey = sails.config.correosSetting.apiKey;

		var ejs2 = new EJS2();
		var lista = [
			{usuario: "Sergio", hora: "9:00am"},
			{usuario: "Javier", hora: "10:02am"},
			{usuario: "Ana", hora: "4:03pm"},
			{usuario: "Marisol", hora: "4:33pm"},
			{usuario: "Evelyn", hora: "11:01pm"}
		];

		ejs2.renderFile("views/reportevistadatos.ejs", {registros: lista}, function(err, contenido){

			var datos  = {
				to: "sergiohidalgocaceres@gmail.com",
				from: sails.config.correosSetting.remitente,
				subject: "Correo de SailsJS",
				html: contenido
			};

			// Usuarios
			// 	.find()
			// 	.then(function(datos){
			/*	AQUÍ OBTIENES LA VISTA CON LOS DATOS INSERTADOS
					LUEGO ENVIAS EL CORREO A TRAVÉS DE MAILGUN
			*/			// 	})
			// 	.catch(function(err){})


			var mailgun = require("mailgun-js")({apiKey: apiKey, domain: dominio });

			mailgun.messages().send(datos, function(err, mensaje){
				if(err) {
					res.negotiate(err);
				}
				console.log(mensaje);
			});

		})

		res.ok();
	},

	enviarReporteVistaAdjunto: function(req, res){
		var dominio = sails.config.correosSetting.dominio;
		var apiKey = sails.config.correosSetting.apiKey;

		var ejs2 = new EJS2();
		var lista = [
			{usuario: "Sergio", hora: "9:00am"},
			{usuario: "Javier", hora: "10:02am"},
			{usuario: "Ana", hora: "4:03pm"},
			{usuario: "Marisol", hora: "4:33pm"},
			{usuario: "Evelyn", hora: "11:01pm"}
		];

		ejs2.renderFile("views/reportevistadatos.ejs", {registros: lista}, function(err, contenido){

			var adjunto = ["pdfs/javascript.pdf", "pdfs/javascript.pdf"];

			var datos  = {
				to: "sergiohidalgocaceres@gmail.com",
				from: sails.config.correosSetting.remitente,
				subject: "Correo de SailsJS",
				attachment: adjunto,
				html: contenido
			};

			var mailgun = require("mailgun-js")({apiKey: apiKey, domain: dominio });

			mailgun.messages().send(datos, function(err, mensaje){
				if(err) {
					res.negotiate(err);
				}
				console.log(mensaje);
			});

		})

		res.ok();
	},

	enviarConServicio: function(req, res){
		var ejs2 = new EJS2();
		var lista = [
			{usuario: "Sergio", hora: "9:00am"},
			{usuario: "Javier", hora: "10:02am"},
			{usuario: "Ana", hora: "4:03pm"},
			{usuario: "Marisol", hora: "4:33pm"},
			{usuario: "Evelyn", hora: "11:01pm"}
		];

		ejs2.renderFile("views/reportevistadatos.ejs", {registros: lista}, function(err, contenido){

			var adjunto = ["pdfs/javascript.pdf", "pdfs/javascript.pdf"];

			var opciones = {
				destinatario: "sergiohidalgocaceres@gmail.com",
				asunto: "Correo desde Sails",
				contenido: contenido,
				adjunto: adjunto,
				esHTML: true,
				cb: function(err, mensaje){
					if(err) {
						res.negotiate(err);
					}
					console.log(mensaje);
				}
			};

			CorreosService.enviar(opciones)
		})

		res.ok();
	}								
};

