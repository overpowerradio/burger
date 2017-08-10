CREATE DATABASE burger_db;
USE burger_db;

-- Create the table plans.
CREATE TABLE burgers
(
id int NOT NULL AUTO_INCREMENT,
burger_name varchar(255) NOT NULL,
devoured BOOLEAN NOT NULL DEFAULT FALSE,
date timestamp,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO burgers (burger_name, devoured) VALUES ('Black Bean Burger', True);
INSERT INTO burgers (burger_name, devoured) VALUES ('Beet Burger', True);
INSERT INTO burgers (burger_name, devoured) VALUES ('Quinoa Burger', false);
INSERT INTO burgers (burger_name, devoured) VALUES ('Tofu Burger', false);