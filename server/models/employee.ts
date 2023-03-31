import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Shifts, EmployeesShifts } from './shift';

@Table({
  tableName: 'employees',
  timestamps: false,
})
export class Employees extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  employee_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  surname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: { isEmail: true },
  })
  email!: string;

  @BelongsToMany(() => Shifts, () => EmployeesShifts)
  employees!: Employees[];
}
