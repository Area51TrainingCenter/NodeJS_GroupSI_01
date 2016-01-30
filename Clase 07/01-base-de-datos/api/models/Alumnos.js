/**
* Alumnos.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: "Alumnos",
  attributes: {
  	idAlumno: {
  		primaryKey: true,
  		type: "integer",
  		autoIncrement: true,
  		unique: true
  	},

  	nombre: {
  		type:"string",
  		required: true
  	},

  	sexo: {
  		type:"string",
  		enum: ["hombre", "mujer"]
  	},

  	correo: {
  		type:"email"
  	},

  	acerca: {
  		type: "text",
  		defaultsTo: "acerca de mi"
  	},

  	fechaNacimiento:{
  		type: "date"
  	},

  	fechaHoraIngresoSistema: {
  		type: "datetime",
  		defaultsTo: new Date()
  	},

  	historial: {
  		type: "json"
  	},

  	foto: {
  		type:"string",
  		size: 500
  	},

  	curso: {
  		collection: "Cursos",
  		via: "alumno"
  	}


  }
};

