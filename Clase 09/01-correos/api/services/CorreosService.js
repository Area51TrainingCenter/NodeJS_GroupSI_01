module.exports = {
	enviar: function(opciones) {
		var dominio = sails.config.correosSetting.dominio;
		var apiKey = sails.config.correosSetting.apiKey;		

		var mailgun = require("mailgun-js")({apiKey: apiKey, domain: dominio });

		var datos  = {
			to: opciones.destinatario,
			from: sails.config.correosSetting.remitente,
			subject: opciones.asunto,
			attachment: opciones.adjunto.length ? opciones.adjunto : ""
		};

		if(opciones.esHTML) {
			datos.html = opciones.contenido;
		} else {
			datos.text = opciones.contenido;
		}

		mailgun.messages().send(datos, opciones.cb);
	}
}