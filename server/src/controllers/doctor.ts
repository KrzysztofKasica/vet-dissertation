import { Doctor } from "../entities/Doctor";
import { dataSourceConn } from "../app-data-source";
import { Request, Response } from "express";
import { isAuth } from "../isAuth";

export const doctorRepository = dataSourceConn.manager.getRepository(Doctor);

export const getDoctorsList = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const doctors = await doctorRepository.createQueryBuilder("doctor")
        .select(['doctor.id', 'doctor.firstName', 'doctor.lastName'])
        .getMany();
        res.status(200).send(doctors)
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const getDoctorById = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const doctor = await doctorRepository.createQueryBuilder("doctor")
        .select(['doctor.id', 'doctor.firstName', 'doctor.lastName'])
        .where("doctor.id = :id", { id: req.body.data.id })
        .getOne();
        res.status(200).send(doctor)
    } else {
        res.status(400).send('Not Authenticated');
    }
}
