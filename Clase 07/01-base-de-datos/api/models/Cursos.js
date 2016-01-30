/**
* Cursos.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: "Cursos",
  attributes: {
  	idCurso: {
  		primaryKey: true,
  		type: "integer",
  		autoIncrement: true,
  		unique: true  		
  	},

  	nombreCurso: "string",

  	nombreProfesor: "string",

  	activo: {
  		type: "boolean",
  		defaultsTo: false
  	}

  }
};

