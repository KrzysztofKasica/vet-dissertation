import { Request, Response } from "express";
import { Pet } from "../entities/Pet";
import { isAuth } from "../middleware/isAuth";
import { dataSourceConn } from "../app-data-source";
import { Client } from "../entities/Client";
import { Species } from "../entities/Species";

const petRepository = dataSourceConn.manager.getRepository(Pet);

export const createPet = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const newPet = new Pet();
        newPet.name = req.body.data.name;
        const mySpecies = await dataSourceConn.manager.findOneBy(Species, {
            name: req.body.data.species,
        });
        if (mySpecies) {
            newPet.species = mySpecies;
            newPet.dateOfBirth = new Date(req.body.data.date);
            const myClient = await dataSourceConn.manager.findOneBy(Client, {
                id: req.session.clientId,
            });

            if (myClient) {
                newPet.client = myClient;
                try {
                    await dataSourceConn.manager.save(newPet);
                    res.status(200).send('Pet created');
                }
                catch (error){
                    console.log(error);
                    res.status(500).send('Saving error');
                }
            } else {
                res.status(400).send('Cookie error. No matching User')
            }
        } else {
                res.status(400).send('No matching species');
        }
    } else {
        res.status(400).send('Not Authenticated');
    }
}