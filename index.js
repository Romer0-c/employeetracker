const mysql = require("mysql");
const inquirer = require("inquirer");

// MySQL DB Connection Information (remember to change this with our specific credentials)

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
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
                "Delete a role",
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
        } else if (answer.action === "View all employees") {
            readEmployee();
        } else if (answer.action === "Create an emloyee") {
            createEmployee();
        } else if (answer.action === "Update an employee") {
            updateEmployee();
        } else if (answer.action === "Delete an employee") {
            deleteEmployee();
        } else if (answer.action === "View all roles") {
            readRole();
        } else if (answer.action === "Add a role") {
            createRole();
        } else if (answer.action === "Delete a role") {
            deleteRole();
        }  else {
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

//"View all roles"
function readRole() {
    connection.query("SELECT * FROM role", function (err, result) {
        if (err) throw err;
        
        menu ();
    });
}


//"Add a role"
function createRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the roles title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the roles salary?"
        },
    ]).then(function (answers) {
        connection.query("INSERT INTO role (title, salary) VALUES (?, ?)", [answers.title, answers.salary], function(err, result){
            if (err) throw err;

            console.log("Successfully created a role!");
            menu();
        });
    })
}


//"Delete a role"
//function deleteRole(){}


//"View all employees"
  function readEmployee(){
        connection.query("SELECT * FROM employee", function (err, result) {
            if (err) throw err;
    
            console.table(result);
    
            menu();
        });
    }

//"Create an emloyee"
function createEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "last",
            message: "What is the employees last name?"
        },
    ]).then(function (answers) {
        connection.query("INSERT INTO employee (name, last) VALUES (?, ?)", [answers.name, answers.last], function (err, result) {
            if (err) throw err;

            console.log("Successfully created an employee!");
            menu();
        });
    })
}


// //"Update an employee"
// function updateEmployee() {
//     connection.query("SELECT * FROM employee", function (err, result){
//         if (err) throw err;
//         const employees = result.map((employee) => {
//             return {
//                 name: employee.first_name,
//                 value: employee.role_id,
//             }

//         });

//         inquirer.prompt ([
//             {
//                 type:"list",
//                 name: "whichEmployee",
//                 message: "Which employees role would you like to update?",
//                 choices: employees
//             },
//             {
//                 type: "input",
//                 name: "role",
//                 message: "What role whould you like to update them to?",
//             }
//         ]).then(function (answers) {
//             connection.query("UPDATE employee SET role = ? WHERE id = ?", [answers.role, answers.whichEmployee], function (err, result){
//                 if (err) throw (err);

//                 console.log("Successfully updated an animals species!");
//                 menu();
//             });

//         })
//     });
// }


//"Delete an employee"
function deleteEmployee() {
    connection.query("SELECT * FROM employee", function (err, result) {
        if (err) throw err;
        const employee = result.map((employee) => {
            return {
                name: employee.first_name,
                value: employee.id,
            }
        });

        inquirer.prompt([
            {
                type: "list",
                name: "whichEmployee",
                message: "Which employee would you like to delete?",
                choices: employee
            }
        ]).then(function (answers) {
            connection.query("DELETE FROM employee where id = ?", [answers.whichEmployee], function(err, result){
                if (err) throw err; 

                console.log("Successfully deleted an employee");
                menu();
            });
        })
    });
}


