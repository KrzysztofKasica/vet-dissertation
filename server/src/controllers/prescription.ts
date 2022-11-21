import { Request, Response } from "express";
import { dataSourceConn } from "../app-data-source";
import { isAuth } from "../isAuth";
import { isDoctor } from "../isDoctor";
import { Prescription } from "../entities/Prescription";
import { petRepository } from "./pet";
import { doctorRepository } from "./doctor";
import { medicationRepository } from "./medication";
import { visitRepository } from "./visit";

const prescriptionRepository = dataSourceConn.manager.getRepository(Prescription);

export const getPrescriptionsByClient = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        if (!isDoctor(req)) {
            const myPrescriptions = await prescriptionRepository.createQueryBuilder("prescription")
            .select(['prescription.id', 'prescription.quantity', 'prescription.medicationId', 'prescription.clientId', 'prescription.doctorId', 'prescription.petId'])
            .where("visit.clientId = :id", { id: req.session.clientId })
            .getRawMany()
            res.status(200).send(myPrescriptions)
        }
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const addPrescription = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        console.log(req);
        const newPrescription = new Prescription();
        const pet = await petRepository.createQueryBuilder("pet")
        .where("pet.id = :id", { id: req.body.data.petId })
        .getOne();
        if (pet) {
            newPrescription.pet = pet;
            const newQuantity: Array<Number> = [];
            req.body.data.quantity.forEach((quantity: string) => {
                newQuantity.push(Number(quantity));
            });
            newPrescription.quantity = newQuantity;
            const newMeds: Array<Number> = [];
            req.body.data.medication.forEach((id: string) => {
                newMeds.push(Number(id));
            });
            const medication = await medicationRepository.createQueryBuilder("medication")
            .where("medication.id IN (:...id)", { id: newMeds  })
            .getMany();
            newPrescription.medication = medication;
            const doctor = await doctorRepository.createQueryBuilder("doctor")
            .where("doctor.id = :id", { id: req.session.clientId })
            .getOne();
            if (doctor) {
                newPrescription.doctor = doctor;
                const visit = await visitRepository.createQueryBuilder("visit")
                .where("visit.id= :id", { id: req.body.data.visitId })
                .getOne();
                if (visit) {
                    newPrescription.visit = visit;
                    try {
                        await dataSourceConn.manager.save(newPrescription);
                        res.status(200).send('Prescription created');
                    }
                    catch (error){
                        console.log(error);
                        res.status(500).send('Saving error');
                    }
                }
            } else {
                res.status(400).send('Bad Request2')
            }
        } else {
            res.status(400).send('Bad Request1')
        }
    } else {
        res.status(400).send('Not Authenticated');
    }
}