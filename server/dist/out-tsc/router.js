"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const express_1 = require("express");
const router = (0, express_1.Router)();
const employeeCont = __importStar(require("./controllers/employee.controller"));
const shiftTypeCont = __importStar(require("./controllers/shiftType.controller"));
const shiftCont = __importStar(require("./controllers/shift.controller"));
const rotaCount = __importStar(require("./controllers/rota.controller"));
//employee methods
router.get('/employees', employeeCont.getAllEmployees);
router.post('/employee', employeeCont.addEmployee);
router.delete('/employees/:id', employeeCont.deleteEmployee);
router.put('/employee/:id', employeeCont.updateEmployee);
//shift type methods
router.get('/shift-types', shiftTypeCont.getAllShiftTypes);
router.post('/shift-type', shiftTypeCont.addShiftType);
router.delete('/shift-type/:id', shiftTypeCont.deleteShiftType);
router.put('/shift-type/:id', shiftTypeCont.updateShiftType);
//shift methods
router.get('/shifts', shiftCont.getAllShifts);
router.post('/shift', shiftCont.addShift);
router.delete('/shift/:id', shiftCont.deleteShift);
router.put('/shift/:id', shiftCont.updateShift);
//rota methods
router.get('/rota', rotaCount.getRota);
module.exports = router;
