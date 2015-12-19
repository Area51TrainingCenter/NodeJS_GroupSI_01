DROP DATABASE IF EXISTS peliculas;

CREATE DATABASE  IF NOT EXISTS peliculas;

USE peliculas;

CREATE TABLE IF NOT EXISTS `peliculas`.`pelicula` (
  `idpelicula` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) DEFAULT NULL,
  `anno` int(11) DEFAULT NULL,
  PRIMARY KEY (`idpelicula`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;