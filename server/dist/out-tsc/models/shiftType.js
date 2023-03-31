"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftTypes = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const shift_1 = require("./shift");
let ShiftTypes = class ShiftTypes extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
], ShiftTypes.prototype, "shift_type_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    })
], ShiftTypes.prototype, "abbreviation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    })
], ShiftTypes.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TIME,
        allowNull: true,
    })
], ShiftTypes.prototype, "start", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TIME,
        allowNull: true,
    })
], ShiftTypes.prototype, "end", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.VIRTUAL,
        get() {
            return parseFloat(`${Math.abs(parseFloat(this.getDataValue('end')) -
                parseFloat(this.getDataValue('start')))}`);
        },
        set(value) {
            throw new Error('Do not try to set the `duration` value!');
        },
    })
], ShiftTypes.prototype, "duration", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => shift_1.Shifts)
], ShiftTypes.prototype, "shifts", void 0);
ShiftTypes = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'shift_types',
        timestamps: false,
    })
], ShiftTypes);
exports.ShiftTypes = ShiftTypes;
