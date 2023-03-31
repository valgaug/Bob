import { Request, Response } from 'express';
const db = require('../models');

import { ShiftTypes } from '../models/shiftType';

export const getAllShiftTypes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let shiftTypes: ShiftTypes[] = await db.ShiftType.findAll();
    return res.status(200).send(shiftTypes);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const addShiftType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let newShiftType = await db.ShiftType.create({
      description: req.body.description,
      abbreviation: req.body.abbreviation,
      start: req.body.start,
      end: req.body.end,
    });

    return res.status(201).send(newShiftType);
  } catch (error) {
    return res.status(400).send({
      errors: error,
    });
  }
};

export const deleteShiftType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let id = req.params.id;

  try {
    await db.ShiftType.destroy({
      where: { shift_type_id: id },
    });
    return res.status(200).json({
      message: ` Shift type deleted successfully`,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateShiftType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let id = req.params.id;

  try {
    let toBeUpdatedArr: ShiftTypes[] = await db.ShiftType.findAll({
      where: { shift_type_id: id },
    });
    let temp: ShiftTypes = toBeUpdatedArr[0];
    await temp.set({ ...req.body });
    await temp.save();
    return res
      .status(200)
      .send(`Shift type with id:${id} was updated successfully.`);
  } catch (error) {
    return res.status(500).send(error);
  }
};
