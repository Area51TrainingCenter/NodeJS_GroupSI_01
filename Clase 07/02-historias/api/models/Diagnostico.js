/**
* Diagnostico.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	idDiagnostico: {
  		primaryKey:true,
  		type: "integer",
  		autoIncrement: true,
  		unique: true
  	},

  	nombreDiagnostico: "string",

  	historia: {
  		collection: "Historias",
  		via: "diagnostico"
  	}

  }
};

