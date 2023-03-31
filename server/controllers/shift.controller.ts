import { Request, Response } from 'express';
const db = require('./models');

import { Shifts } from '../models/shift';

export const getAllShifts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let shifts: Shifts[] = await db.Shift.findAll();
    return res.status(200).send(shifts);
  } catch (err: any) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const addShift = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let newShift = await db.Shift.create({
      day_number: req.body.day_number,
      people_required: req.body.people_required,
      shift_type_id: req.body.shift_type_id,
    });
    return res.status(201).send(newShift);
  } catch (err: any) {
    return res.status(400).send({ error: err });
  }
};

export const deleteShift = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let id: string = req.params.id;
  try {
    await db.Shift.destroy({
      where: { shift_id: id },
    });
    return res.status(200).json({
      message: ` Shift deleted successfully`,
    });
  } catch (err: any) {
    return res.status(500).send(err);
  }
};

export const updateShift = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let id: string = req.params.id;
  try {
    let toBeUpdatedArr = await db.Shift.findAll({
      where: { shift_id: id },
    });
    let temp: Shifts = toBeUpdatedArr[0];
    await temp.set({ ...req.body });
    await temp.save();
    return res
      .status(200)
      .send(`Shift with id:${id} was updated successfully.`);
  } catch (error) {
    return res.status(500).send(error);
  }
};
