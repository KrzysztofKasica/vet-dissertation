import { Request, Response } from "express";
import { Status, Visit } from "../entities/Visit";
import { dataSourceConn } from "../app-data-source";
import { isAuth } from "../isAuth";
import { petRepository } from "./pet";
import { doctorRepository } from "./doctor";
import { clientRepository } from "./client";
import { AvaliableDates } from "../entities/AvaliableDates";
import { avaliableDatesRepository } from "./avaliableDates";
import { isDoctor } from "../isDoctor";

export const visitRepository = dataSourceConn.manager.getRepository(Visit);

export const getVisitByUser = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const myVisits = await visitRepository.createQueryBuilder("visit")
        .leftJoinAndSelect('visit.doctor', 'doctor')
        .leftJoinAndSelect('visit.pet', 'pet')
        .select(['visit.id', 'visit.startDate', 'visit.status', 'doctor.id', 'doctor.firstName','doctor.lastName', 'pet.name'])
        .where("visit.clientId = :id", { id: req.session.clientId })
        .orderBy("visit.startDate", "ASC")
        .getRawMany()
        res.status(200).send(myVisits)
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const getLatestVisitByUser = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const myVisits = await visitRepository.createQueryBuilder("visit")
        .leftJoinAndSelect('visit.doctor', 'doctor')
        .leftJoinAndSelect('visit.pet', 'pet')
        .select(['visit.id', 'visit.startDate', 'visit.status', 'doctor.id', 'doctor.firstName','doctor.lastName', 'pet.name'])
        .where("visit.clientId = :id", { id: req.session.clientId })
        .orderBy("visit.startDate", "ASC")
        .limit(5)
        .getRawMany()
        res.status(200).send(myVisits)
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const createVisit = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const newVisit = new Visit();
        newVisit.startDate = new Date(req.body.data.startDate);
        newVisit.status = Status.ToBeAccepted;
        const myPet = await petRepository.createQueryBuilder("pet")
        .where("pet.name = :name", { id: req.body.data.petName })
        .where("pet.clientId = :id", { id: req.session.clientId})
        .getOne();
        if (myPet) {
            newVisit.pet = myPet;
            const client = await clientRepository.createQueryBuilder("client")
            .where("client.id = :id", { id: req.session.clientId })
            .getOne();
            if (client) {
                newVisit.client = client;
                newVisit.notes = '';
                const myDoctor = await doctorRepository.createQueryBuilder("doctor")
                .where("doctor.id = :id", { id: req.body.data.doctorId })
                .getOne();
                if (myDoctor) {
                    newVisit.doctor = myDoctor;
                    const myDate = await avaliableDatesRepository.createQueryBuilder("avaliableDates")
                    .where("avaliableDates.id = :id", { id: req.body.data.dateId })
                    .leftJoinAndSelect('avaliableDates.doctors', "doctor")
                    .select([
                        'avaliableDates.id',
                        'doctor.id'
                    ])
                    .getOne();
                    if (myDate) {
                        try {
                            await dataSourceConn.manager.save(newVisit);
                            myDate.doctors = myDate.doctors.filter(id => id.id != req.body.data.doctorId);
                            await dataSourceConn.manager.save(myDate);
                            if (myDate.doctors.length === 0) {
                                await dataSourceConn.createQueryBuilder()
                                .softDelete()
                                .from(AvaliableDates)
                                .where("id = :id", { id: req.body.data.dateId })
                                .execute();
                            }   
                            res.status(200).send("Visit created");
                        }
                        catch (error){
                            console.log(error);
                            res.status(500).send('Saving error');
                        }
                    } else {
                        res.status(500).send();
                    }
                } else {
                    res.status(500).send();
                }
            } else {
                res.status(500).send();
            }
        } else {
            res.status(500).send();
        }
    } else {
        res.status(400).send('Not Authenticated');
    }
}


export const cancelVisit = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const visit = await visitRepository.createQueryBuilder("visit")
        .where("visit.id = :visitId AND visit.clientId = :id AND (visit.status = :tobe OR visit.status = :pending)", { visitId: req.body.data.visitId, id: req.session.clientId, tobe: 'TO BE ACCEPTED', pending: 'PENDING'})
        .getOne();
        if (visit) {
            let myDate = await avaliableDatesRepository.createQueryBuilder("avaliableDates")
            .where("avaliableDates.avaliableDate = :date", { date: req.body.data.date})
            .leftJoinAndSelect('avaliableDates.doctors', "doctor")
            .select([
                'avaliableDates.id',
                'doctor.id'
            ])
            .getOne();
            try {
                if(!myDate) {
                    await dataSourceConn.createQueryBuilder()
                    .restore()
                    .from(AvaliableDates)
                    .where("avaliableDate = :date", { date: req.body.data.date })
                    .execute();

                    myDate = await avaliableDatesRepository.createQueryBuilder("avaliableDates")
                    .where("avaliableDates.avaliableDate = :date", { date: req.body.data.date})
                    .leftJoinAndSelect('avaliableDates.doctors', "doctor")
                    .select([
                        'avaliableDates.id',
                        'doctor.id'
                    ])
                    .getOne();
                }
                const myDoctor = await doctorRepository.createQueryBuilder('doctor')
                .where('id = :id', { id: req.body.data.doctorId })
                .getOne();
                if(myDoctor) {
                    myDate?.doctors.push(myDoctor)
                    await dataSourceConn.manager.save(myDate);
                    await dataSourceConn.createQueryBuilder()
                    .delete()
                    .from(Visit)
                    .where("id = :id", { id: req.body.data.visitId })
                    .execute();
                    res.status(200).send("Visit Cancelled");
                } else {
                    res.status(500).send()
                }
            }
            catch (error){
                console.log(error);
                res.status(500).send('Saving error');
            }
        } else {
            res.status(400).send('Not Authorized');
        }
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const getVisitRequestsByDoctor = async (req: Request, res: Response) => {
    if (isAuth(req) && isDoctor(req)) {
        const myVisits = await visitRepository.createQueryBuilder("visit")
        .leftJoinAndSelect('visit.client', 'client')
        .leftJoinAndSelect('visit.pet', 'pet')
        .select(['visit.id', 'visit.startDate', 'client.id', 'client.firstName','client.lastName', 'pet.name'])
        .where("visit.doctorId = :id AND visit.status = :status", { id: req.session.clientId, status: Status.ToBeAccepted})
        .orderBy("visit.startDate", "ASC")
        .getRawMany()
        res.status(200).send(myVisits)
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const acceptVisit = async (req: Request, res: Response) => {
    if (isAuth(req) && isDoctor(req)) {
        const visit = await visitRepository.createQueryBuilder("visit")
        .where("visit.id = :visitId AND visit.doctorId = :id", {visitId: req.body.data.visitId, id: req.session.clientId})
        .getOne();
        if (visit) {
            visit.status = Status.Pending;
            await dataSourceConn.manager.save(visit);
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const getIncomingVisits = async (req: Request, res: Response) => {
    if (isAuth(req) && isDoctor(req)) {
        const currentDate = new Date();
        const myVisits = await visitRepository.createQueryBuilder("visit")
        .leftJoinAndSelect('visit.client', 'client')
        .leftJoinAndSelect('visit.pet', 'pet')
        .select(['visit.id', 'visit.startDate', 'client.id', 'client.firstName','client.lastName', 'pet.name'])
        .where("visit.doctorId = :id AND visit.status = :status AND visit.startDate > :date", { id: req.session.clientId, status: Status.Pending, date: currentDate})
        .orderBy("visit.startDate", "ASC")
        .getRawMany()
        res.status(200).send(myVisits)
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const getVisitHistory = async (req: Request, res: Response) => {
    if (isAuth(req) && isDoctor(req)) {
        const currentDate = new Date();
        const myVisits = await visitRepository.createQueryBuilder("visit")
        .leftJoinAndSelect('visit.client', 'client')
        .leftJoinAndSelect('visit.pet', 'pet')
        .select(['visit.id', 'visit.startDate', 'client.id', 'client.firstName','client.lastName', 'pet.name'])
        .where("visit.doctorId = :id AND visit.status = :status", { id: req.session.clientId, status: Status.Completed})
        .orderBy("visit.startDate", "ASC")
        .getRawMany()
        res.status(200).send(myVisits)
    } else {
        res.status(400).send('Not Authenticated');
    }
}