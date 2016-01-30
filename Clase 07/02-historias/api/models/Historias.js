/**
* Historias.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	idHistoria: {
  		primaryKey:true,
  		type: "integer",
  		autoIncrement: true,
  		unique: true
  	},

  	nombrePaciente: "string",

  	medico: {
  		model: "Medicos"
  	},

  	enfermero: {
  		model: "Enfermeros"
  	},

  	diagnostico: {
  		model: "Diagnostico"
  	}

  }
};

