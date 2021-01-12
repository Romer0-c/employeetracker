const mysql = require("mysql");
const inquirer = require("inquirer");

// MySQL DB Connection Information (remember to change this with our specific credentials)

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "emptracker_db"
});


// Initiate MySQL Connection.

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    menu();
});

function menu() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: [
                "View all departments",
                "Create a department",
                "Delete a department",
                "View all employees",
                //functions to be written out 
                "Create an emloyee",
                "Update an employee",
                "Delete an employee",
                "View all roles",
                "Add a role",
                "Update a role",
                "Exit",
            ]
        }
    ]).then(function (answer) {
        if (answer.action === "View all departments") {
            readDepartment();
        } else if (answer.action === "Create a department") {
            createDepartment();
        } else if (answer.action === "Delete a department") {
            deleteDepartment();
        } else {
            connection.end();
        }
    })
}


function readDepartment() {
    connection.query("SELECT * FROM department", function (err, result) {
        if (err) throw err;

        console.table(result);

        menu();
    });
}

function createDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What department would you like to add?"
        }
    ]).then(function (answers) {
        connection.query("INSERT INTO department (name) VALUES (?)", answers.name, function (err, result) {
            if (err) throw err;

            console.log("Successfully created a department!");
            menu();
        });
    })
}

function deleteDepartment() {
    connection.query("SELECT * FROM department", function (err, result) {
        if (err) throw err;
        const departments = result.map((department) => {
            return {
                name: department.name,
                value: department.id,
            }
        });

        inquirer.prompt([
            {
                type: "list",
                name: "whichDepartment",
                message: "Which department would you like to delete?",
                choices: departments
            }
        ]).then(function (answers) {
            connection.query("DELETE FROM department WHERE id = ?", [answers.whichDepartment], function (err, result) {
                if (err) throw err;

                console.log("Successfully deleted a department!");
                menu();
            });
        })
    });
}

