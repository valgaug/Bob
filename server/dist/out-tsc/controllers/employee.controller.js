"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../models');
const Employee = db.employee;
exports.getEmployees = (req, res) => {
    Employee.findAll()
        .then(data => {
        res.send(data);
    })
        .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving employees.'
        });
    });
};
exports.addEmployee = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Employee
    const employee = {
        name: req.body.name,
        email: req.body.email,
        surname: req.body.surname,
    };
    // Save Employee in the database
    Employee.create(employee)
        .then(data => {
        res.send(data);
    })
        .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Employee.'
        });
    });
};
exports.deleteEmployee = (req, res) => {
    const id = req.params.id;
    Employee.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
                message: "Employee was deleted successfully!"
            });
        }
        else {
            res.send({
                message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
            });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Employee with id=" + id
        });
    });
};
