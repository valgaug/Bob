import { Router } from 'express';
const router = Router();

import * as employeeCont from './controllers/employee.controller';
import * as shiftTypeCont from './controllers/shiftType.controller';
import * as shiftCont from './controllers/shift.controller';
import * as rotaCount from './controllers/rota.controller';

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

export = router;
