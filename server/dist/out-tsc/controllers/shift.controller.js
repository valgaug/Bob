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
exports.updateShift = exports.deleteShift = exports.addShift = exports.getAllShifts = void 0;
const db = require('./models');
const getAllShifts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let shifts = yield db.Shift.findAll();
        return res.status(200).send(shifts);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});
exports.getAllShifts = getAllShifts;
const addShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newShift = yield db.Shift.create({
            day_number: req.body.day_number,
            people_required: req.body.people_required,
            shift_type_id: req.body.shift_type_id,
        });
        return res.status(201).send(newShift);
    }
    catch (err) {
        return res.status(400).send({ error: err });
    }
});
exports.addShift = addShift;
const deleteShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        yield db.Shift.destroy({
            where: { shift_id: id },
        });
        return res.status(200).json({
            message: ` Shift deleted successfully`,
        });
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.deleteShift = deleteShift;
const updateShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        let toBeUpdatedArr = yield db.Shift.findAll({
            where: { shift_id: id },
        });
        let temp = toBeUpdatedArr[0];
        yield temp.set(Object.assign({}, req.body));
        yield temp.save();
        return res
            .status(200)
            .send(`Shift with id:${id} was updated successfully.`);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.updateShift = updateShift;
