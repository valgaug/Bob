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
exports.updateShiftType = exports.deleteShiftType = exports.addShiftType = exports.getAllShiftTypes = void 0;
const db = require('../models');
const getAllShiftTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let shiftTypes = yield db.ShiftType.findAll();
        return res.status(200).send(shiftTypes);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
exports.getAllShiftTypes = getAllShiftTypes;
const addShiftType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newShiftType = yield db.ShiftType.create({
            description: req.body.description,
            abbreviation: req.body.abbreviation,
            start: req.body.start,
            end: req.body.end,
        });
        return res.status(201).send(newShiftType);
    }
    catch (error) {
        return res.status(400).send({
            errors: error,
        });
    }
});
exports.addShiftType = addShiftType;
const deleteShiftType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        yield db.ShiftType.destroy({
            where: { shift_type_id: id },
        });
        return res.status(200).json({
            message: ` Shift type deleted successfully`,
        });
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.deleteShiftType = deleteShiftType;
const updateShiftType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        let toBeUpdatedArr = yield db.ShiftType.findAll({
            where: { shift_type_id: id },
        });
        let temp = toBeUpdatedArr[0];
        yield temp.set(Object.assign({}, req.body));
        yield temp.save();
        return res
            .status(200)
            .send(`Shift type with id:${id} was updated successfully.`);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.updateShiftType = updateShiftType;
