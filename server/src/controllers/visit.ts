import { Request, Response } from "express";
import { Status, Visit } from "../entities/Visit";
import { dataSourceConn } from "../app-data-source";
import { isAuth } from "../isAuth";
import { petRepository } from "./pet";
import { doctorRepository } from "./doctor";

const visitRepository = dataSourceConn.manager.getRepository(Visit);

export const getVisitByUser = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const myVisits = await visitRepository.createQueryBuilder("visit")
        .where("visit.clientId = :id", { id: req.session.clientId })
        .getMany()
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
        .where("pet.id = :id", { id: req.body.data.petId })
        .getOne();
        if (myPet) {
            newVisit.pet = myPet;
            newVisit.client = myPet.client;
            const myDoctor = await doctorRepository.createQueryBuilder("doctor")
            .where("doctor.id = :id", { id: req.body.data.doctorId })
            .getOne();
            if (myDoctor) {
                try {
                    await dataSourceConn.manager.save(newVisit);
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
        res.status(400).send('Not Authenticated');
    }
}