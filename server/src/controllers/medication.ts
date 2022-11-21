import { Request, Response } from "express";
import { dataSourceConn } from "../app-data-source";
import { isAuth } from "../isAuth";
import { Medication } from "../entities/Medication";
import { speciesRepository } from "./species";

const medicationRepository = dataSourceConn.manager.getRepository(Medication);

export const addMedication = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const newMed = new Medication;
        newMed.dosePerKg = req.body.data.dosePerKg;
        newMed.name = req.body.data.name;
        const newSpecies: Array<Number> = [];
        req.body.data.species.forEach((id: string) => {
            newSpecies.push(Number(id));
        });
        const species = await speciesRepository.createQueryBuilder("species")
        .where("species.id IN (:...id)", { id: newSpecies  })
        .getMany();
        if (species) {
            newMed.species = species;
            try {
                await dataSourceConn.manager.save(newMed);
                res.status(200).send('Medication created');
            }
            catch (error){
                console.log(error);
                res.status(500).send('Saving error');
            }
            res.status(200).send(species);
        } else {
            res.status(400).send();
        }
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const getMedication = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const medication = await medicationRepository
        .createQueryBuilder("medication")
        .leftJoinAndSelect("medication.species", "species")
        .getMany()
        console.log(medication)
        res.status(200).send(medication)
    } else {
        res.status(400).send('Not Authenticated')
    }
}