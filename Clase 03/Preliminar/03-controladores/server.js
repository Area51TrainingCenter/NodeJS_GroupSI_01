var app = require("./app");

function fnInicio(){
	console.log("Servidor corriendo en el puerto " +  app.get("puerto"));
}

app.listen(app.get("puerto"), fnInicio);