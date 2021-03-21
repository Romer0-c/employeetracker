DROP DATABASE IF EXISTS emptracker_db;

CREATE DATABASE emptracker_db;

USE emptracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary decimal,
    department_id INT(30),
    PRIMARY KEY (id)
    );

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(30),
    PRIMARY KEY (id)
);




INSERT INTO department 
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role 
    (title, salary, department_id)
VALUES 
    ('Sales Lead', 10000, 1),
    ('Devops Engineer', 200000, 2),
    ('Lead Engineer', 340000, 2),
    ('Software Engineer', 550000, 2),
    ('Account Manager', 40000, 1),
    ('Accountant', 60000, 3),
    ('Lawer', 70000, 4),
    ('Sales Rep', 55000, 1);



INSERT INTO employee 
    (first_name, last_name, role_id)
VALUES 
("Ada", "Lovelace", 1),
("Edith", "Clarke", 2),
("Grace", "Hopper", 2),
("Arabella", "Mansfield",3),
("Charlotte", "Ray",3),
("Sonia", "Sotomayor",4),
("Ruth", "Bader Ginsburg",4);
