/**
* Usuarios.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: "usuarios",
  attributes: {
  	id: {
  		primaryKey: true,
  		type: "integer",
  		autoIncrement: true,
  		unique: true
  	},

  	nombres: "string",
  	apellidos: "string"

  }
};

