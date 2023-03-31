import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { ShiftTypes } from './shiftType';
import { Employees } from './employee';

@Table({
  tableName: 'shifts',
  timestamps: false,
})
export class Shifts extends Model {
  @ForeignKey(() => ShiftTypes)
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  shift_id!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  day_number!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  people_required!: string;

  @BelongsTo(() => ShiftTypes)
  name!: ShiftTypes;

  @BelongsToMany(() => Employees, () => EmployeesShifts)
  employees!: Employees[];
}

@Table
export class EmployeesShifts extends Model {
  @ForeignKey(() => Shifts)
  @Column
  shiftId!: number;

  @ForeignKey(() => Employees)
  @Column
  employeeId!: number;
}
