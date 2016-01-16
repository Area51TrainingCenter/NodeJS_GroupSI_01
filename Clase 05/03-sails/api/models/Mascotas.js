/**
* Mascotas.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: "connMySQL",
  tableName: "mascotas",
  attributes: {
  		id: {
  			primaryKey: true,
  			unique: true,
  			autoIncrement: true,
  			type: "integer"
  		},

  		nombre: {
  			type: "string",
  			size:255,
  			required: true
  		},

  		raza: "string"

  }
};

