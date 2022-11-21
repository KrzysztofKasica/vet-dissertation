import { Request, Response } from "express";
import { dataSourceConn } from "../app-data-source";
import { Species } from "../entities/Species";
import { isAuth } from "../isAuth";

export const speciesRepository = dataSourceConn.manager.getRepository(Species);

export const getSpecies = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const species = await speciesRepository.find();
        if (species) {
            res.status(200).send(species);
        } else {
            res.status(400).send('Connection error');
        }
    } else {
        res.status(400).send('Not Authenticated');
    }
}