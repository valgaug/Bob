const config = require('./db.config.json');

import { Sequelize } from 'sequelize-typescript';
import { Employees } from './employee';
import { Shifts } from './shift';
import { ShiftTypes } from './shiftType';

const sequelize = new Sequelize({
  database: config.testDatabase,
  username: config.user,
  password: config.password,
  host: config.host,
  dialect: config.dialect,
  logging: config.logging,
  models: [Employees, Shifts, ShiftTypes],
});

export default sequelize;
