import { Request, Response } from "express";
import { Status, Visit } from "../entities/Visit";
import { dataSourceConn } from "../app-data-source";
import { isAuth } from "../isAuth";
import { petRepository } from "./pet";
import { doctorRepository } from "./doctor";
import { clientRepository } from "./client";
import { AvaliableDates } from "../entities/AvaliableDates";

export const visitRepository = dataSourceConn.manager.getRepository(Visit);

export const getVisitByUser = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const myVisits = await visitRepository.createQueryBuilder("visit")
        .select(['visit.id', 'visit.startDate', 'visit.status', 'visit.doctorId', 'visit.petId'])
        .where("visit.clientId = :id", { id: req.session.clientId })
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
                    try {
                        await dataSourceConn.manager.save(newVisit);
                        await dataSourceConn.createQueryBuilder()
                        .softDelete()
                        .from(AvaliableDates)
                        .where("id = :id", { id: req.body.data.dateId })
                        .execute()
                        res.status(200).send('Visit created');
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
        res.status(400).send('Not Authenticated');
    }
}