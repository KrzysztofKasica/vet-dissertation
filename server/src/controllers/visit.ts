import { Request, Response } from "express";
import { Status, Visit } from "../entities/Visit";
import { dataSourceConn } from "../app-data-source";
import { isAuth } from "../isAuth";
import { petRepository } from "./pet";
import { doctorRepository } from "./doctor";
import { clientRepository } from "./client";
import { AvaliableDates } from "../entities/AvaliableDates";
import { avaliableDatesRepository } from "./avaliableDates";

export const visitRepository = dataSourceConn.manager.getRepository(Visit);

export const getVisitByUser = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const myVisits = await visitRepository.createQueryBuilder("visit")
        .select(['visit.id', 'visit.startDate', 'visit.status', 'visit.doctorId', 'visit.petId'])
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
        .select(['visit.id', 'visit.startDate', 'visit.status', 'visit.doctorId', 'visit.petId'])
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
    // console.log(req)
    if (isAuth(req)) {
        const visit = await visitRepository.createQueryBuilder("visit")
        .where("visit.id = :visitId AND (visit.clientId = :id OR visit.doctorId = :id) AND (visit.status = :tobe OR visit.status = :pending)", { visitId: req.body.data.visitId, id: req.session.clientId, tobe: 'TO BE ACCEPTED', pending: 'PENDING'})
        .getOne();
        if (visit) {
            
            // console.log(visit)
            const date = new Date(req.body.data.date)
            // const date = new Date('2022-02-11T16:30:00.000Z')
            const myDate = await avaliableDatesRepository.createQueryBuilder("avaliableDates")
            .where("avaliableDates.avaliableDate = :date", { date: req.body.data.date})
            .leftJoinAndSelect('avaliableDates.doctors', "doctor")
            .select([
                'avaliableDates.id',
                'doctor.id'
            ])
            .getOne();
            console.log(myDate)
            console.log('DATA TUTAJ    ', date)

            try {
                if(!myDate) {
                    await dataSourceConn.createQueryBuilder()
                    .restore()
                    .from(AvaliableDates)
                    .where("avaliableDate = :date", { date: req.body.data.date })
                    .execute()
                }
                const myDoctor = await doctorRepository.createQueryBuilder('doctor')
                .where('id = :id', { id: req.body.data.doctorId })
                .getOne();
                if(myDoctor) {
                    myDate?.doctors.push(myDoctor)
                    console.log(myDoctor)
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