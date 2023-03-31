import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Shifts } from './shift';

@Table({
  tableName: 'shift_types',
  timestamps: false,
})
export class ShiftTypes extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  shift_type_id!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  abbreviation!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description!: string;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  start!: string;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  end!: string;

  @Column({
    type: DataType.VIRTUAL,
    get(): number {
      return parseFloat(
        `${Math.abs(
          parseFloat(this.getDataValue('end')) -
            parseFloat(this.getDataValue('start'))
        )}`
      );
    },
    set(value) {
      throw new Error('Do not try to set the `duration` value!');
    },
  })
  duration!: string;

  @HasMany(() => Shifts)
  shifts!: Shifts[];
}
