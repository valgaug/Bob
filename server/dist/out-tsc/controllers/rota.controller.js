"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Op } = require('sequelize');
const db = require('../models');
const { shiftDuration, fakeDate } = require('../convertTime');
const MAXHOURS = 150;
function getAllShiftsWithShiftType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const shifts = yield db.ShiftType.findAll({
                include: [
                    {
                        model: db.ShiftType,
                        as: 'shiftType',
                        required: true,
                        where: { shift_type_id: { [Op.not]: null } },
                    },
                ],
            });
            res.status(200).send(shifts);
        }
        catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred while retrieving shifts.'
            });
        }
    });
}
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield db.Employee.findAll({ raw: true });
        res.status(200).send(employees);
    }
    catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving employees.'
        });
    }
});
const expandShiftsWithShiftType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let days = [...Array(28).keys()].reduce((acc, elem) => { return Object.assign(Object.assign({}, acc), { [elem + 1]: [] }); }, {});
    try {
        let inp = yield getAllShiftsWithShiftType(req, res);
        const out = inp.filter((shift) => {
            return shift['shifts.people_required'] > 0;
        }).map((shift) => { return Object.assign(Object.assign({}, shift), { 'assignedEmployees': [] }); });
        out.forEach((shift) => {
            let d = shift['shifts.day_number'].toString();
            days[d].push(shift);
        });
        res.status(200).send(days);
    }
    catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving shifts.'
        });
    }
});
const prioritiseShifts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let inp = yield expandShiftsWithShiftType(req, res);
        let days = Object.keys(inp);
        let shifts = days.map((day) => {
            return inp[day].sort((a, b) => {
                return a['shifts.shift_type_id'] - b['shifts.shift_type_id'];
            });
        });
        res.status(200).send(shifts);
    }
    catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving shifts.'
        });
    }
});
const generateRandomRota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield getAllEmployees(req, res);
        const shifts = yield prioritiseShifts(req, res);
        let days = Object.keys(shifts);
        let rota = days.map((day) => {
            return shifts[day].map((shift) => {
                let employeesRequired = shift['shifts.people_required'];
                let employeesAssigned = shift['assignedEmployees'];
                let employeesAvailable = employees.filter((employee) => {
                    return !employeesAssigned.includes(employee['employee_id']);
                });
                let employeesToAssign = employeesAvailable.slice(0, employeesRequired);
                shift['assignedEmployees'] = [...shift['assignedEmployees'], ...employeesToAssign];
                return shift;
            });
        });
    }
    finally { }
    ;
    res.status(200).send(rota);
});
try { }
catch (error) {
    res.status(500).send({
        message: error.message || 'Some error occurred while retrieving shifts.'
    });
}
;
const getRota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rota = yield generateRandomRota(req, res);
        res.status(200).send(rota);
    }
    catch (error) {
        console.log(error);
    }
});
