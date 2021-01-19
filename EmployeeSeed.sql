DROP DATABASE IF EXISTS emptracker_db;
CREATE DATABASE emptracker_db;

USE emptracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Sales");


CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary decimal,
    department_id INT(30),
    PRIMARY KEY (id)
    );

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 80000, 1);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(30),
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name)
VALUES
("Ada", "Lovelace"),
("Edith", "Clarke"),
("Grace", "Hopper"),
("Arabella", "Mansfield"),
("Charlotte", "Ray"),
("Sonia", "Sotomayor"),
("Ruth", "Bader Ginsburg");
