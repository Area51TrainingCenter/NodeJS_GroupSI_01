var Agenda = require("agenda");

var agenda = new Agenda();
agenda.database("mongodb://127.0.0.1/tareas");
agenda.processEvery("1 minute");

agenda.define("tarea consola", function(jobs, done) {
	console.log("Tarea ejecutada");
	done();
});

agenda.define("enviar reporte", function(jobs, done){
	console.log("Tarea de enviar reporte");
	done();
});

agenda.define("enviar correos", function(jobs, done){
	console.log("Enviando correos masivos");
	done();
})

agenda.on("ready", function(){
	agenda.every("30 seconds", "tarea consola");

	var tarea = agenda.create("enviar reporte");
	tarea.repeatAt("1:30pm", {timezone: "America/Lima"});
	tarea.save();

	var tarea2 = agenda.create("enviar correos");
	tarea2.schedule("1:34pm", {timezone: "America/Lima"});
	tarea2.save();

	agenda.start();
})