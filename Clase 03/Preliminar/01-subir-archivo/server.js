var app = require("./app");

function fnInicio(){
	console.log("Servidor ejecutándose en el puerto " + app.get("puerto"))
}

app.listen(app.get("puerto"), fnInicio);