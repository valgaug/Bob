"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesShifts = exports.Shifts = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const shiftType_1 = require("./shiftType");
const employee_1 = require("./employee");
let Shifts = class Shifts extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => shiftType_1.ShiftTypes),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    })
], Shifts.prototype, "shift_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    })
], Shifts.prototype, "day_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    })
], Shifts.prototype, "people_required", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => shiftType_1.ShiftTypes)
], Shifts.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => employee_1.Employees, () => EmployeesShifts)
], Shifts.prototype, "employees", void 0);
Shifts = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'shifts',
        timestamps: false,
    })
], Shifts);
exports.Shifts = Shifts;
let EmployeesShifts = class EmployeesShifts extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Shifts),
    sequelize_typescript_1.Column
], EmployeesShifts.prototype, "shiftId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => employee_1.Employees),
    sequelize_typescript_1.Column
], EmployeesShifts.prototype, "employeeId", void 0);
EmployeesShifts = __decorate([
    sequelize_typescript_1.Table
], EmployeesShifts);
exports.EmployeesShifts = EmployeesShifts;
