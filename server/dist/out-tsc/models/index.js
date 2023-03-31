"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('./db.config.json');
const sequelize_typescript_1 = require("sequelize-typescript");
const employee_1 = require("./employee");
const shift_1 = require("./shift");
const shiftType_1 = require("./shiftType");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: config.testDatabase,
    username: config.user,
    password: config.password,
    host: config.host,
    dialect: config.dialect,
    logging: config.logging,
    models: [employee_1.Employees, shift_1.Shifts, shiftType_1.ShiftTypes],
});
exports.default = sequelize;
