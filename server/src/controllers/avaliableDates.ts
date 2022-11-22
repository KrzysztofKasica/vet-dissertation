import { Request, Response } from "express";
import { dataSourceConn } from "../app-data-source";
import { isAuth } from "../isAuth";
import { doctorRepository } from "./doctor";
import { AvaliableDates } from "../entities/AvaliableDates";

export const avaliableDatesRepository = dataSourceConn.manager.getRepository(AvaliableDates);

export const addDate = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const newDate = new AvaliableDates();
        newDate.avaliableDate = new Date(req.body.data.date);
        const doctorsId: Array<Number> = [];
        req.body.data.doctorsId.forEach((doctorId: string) => {
            doctorsId.push(Number(doctorId));
        });
        const doctors = await doctorRepository.createQueryBuilder("doctor")
        .where("doctor.id IN (:...id)", { id: doctorsId  })
        .getMany();
        newDate.doctors = doctors;
        try {
            await dataSourceConn.manager.save(newDate);
            res.status(200).send('New Date created');
        }
        catch (error){
            console.log(error);
            res.status(500).send('Saving error');
        }
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const getDates = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const dates = await avaliableDatesRepository
        .createQueryBuilder("avaliableDates")
        .leftJoinAndSelect("avaliableDates.doctors", "doctor")
        .select([
            'avaliableDates.avaliableDate',
            'doctor.firstName',
            'doctor.lastName',
            'doctor.id',
            'avaliableDates.id'
        ])
        .orderBy("avaliableDates.avaliableDate", "ASC")
        .getMany()
        res.status(200).send(dates)
    }
}