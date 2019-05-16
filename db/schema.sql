CREATE DATABASE burger_db;

USE burger_db;

CREATE TABLE burgers (
    id int NOT NULL AUTO_INCREMENT,
    burger_name varchar(100) NOT NULL,
    devoured boolean,
    PRIMARY KEY (id)
);
