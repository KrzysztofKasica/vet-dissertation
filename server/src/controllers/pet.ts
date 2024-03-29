import { Request, Response } from "express";
import { Pet } from "../entities/Pet";
import { isAuth } from "../isAuth";
import { dataSourceConn } from "../app-data-source";
import { Client } from "../entities/Client";
import { Species } from "../entities/Species";

export const petRepository = dataSourceConn.manager.getRepository(Pet);

export const createPet = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const newPet = new Pet();
        newPet.name = req.body.data.name;
        const mySpecies = await dataSourceConn.manager.findOneBy(Species, {
            name: req.body.data.species,
        });
        if (mySpecies) {
            newPet.species = mySpecies;
            newPet.dateOfBirth = new Date(req.body.data.dateOfBirth);
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

export const editPet = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const myPet = await petRepository.findOneBy({id: req.body.data.id});
        if (myPet) {
            myPet.name = req.body.data.name
            const mySpecies = await dataSourceConn.manager.findOneBy(Species, {
                name: req.body.data.species,
            });
            if (mySpecies) {
                myPet.species = mySpecies;
                myPet.dateOfBirth = new Date(req.body.data.dateOfBirth);
                try {
                    await dataSourceConn.manager.save(myPet);
                    res.status(200).send('Pet updated');
                }
                catch (error){
                    console.log(error);
                    res.status(500).send('Saving error');
                }
            } else {
                res.status(400).send('No matching species');
            }
        } else {
            res.status(400).send('No matching pet');
        }
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const deletePet = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const myPet = await petRepository.createQueryBuilder("pet")
        .select(['pet.clientId'])
        .where("pet.id = :id", { id: req.body.data.id })
        .getRawOne();
        if (myPet) {
            if (myPet.clientId === req.session.clientId) {
                await petRepository.createQueryBuilder('pet')
                .delete()
                .from(Pet)
                .where("pet.id = :id", { id: req.body.data.id })
                .execute()

                res.status(200).send("Pet deleted");
            } else {
                res.status(400).send('Not Authenticated');
            }
        } else {
            res.status(400).send("Pet doesn't exist")
        }
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const getPetsByUser = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const myPets = await petRepository.createQueryBuilder("pet")
        .select(['pet.id', 'pet.name', 'pet.dateOfBirth', 'pet.speciesId'])
        .where("pet.clientId = :id", { id: req.session.clientId })
        .getRawMany()
        res.status(200).send(myPets)
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const getPetsNameListByUser = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const myPets = await petRepository.createQueryBuilder("pet")
        .select(['pet.name'])
        .where("pet.clientId = :id", { id: req.session.clientId })
        .getRawMany()
        res.status(200).send(myPets)
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const getPetById = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const myPet = await petRepository.createQueryBuilder("pet")
        .where("pet.id = :id", { id: req.params.id })
        .leftJoinAndSelect('pet.species', 'species')
        .select([
            'pet.name',
            'pet.dateOfBirth',
            'species.name'
        ])
        .getOne();
        res.status(200).send(myPet);
    } else {
        res.status(400).send('Not Authenticated');
    }
}

export const doesPetBelongToUser = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const myPet = await petRepository.createQueryBuilder("pet")
        .select(['pet.clientId'])
        .where("pet.id = :id", { id: req.params.id })
        .getRawOne();
        if (myPet) {
            if (myPet.clientId === req.session.clientId) {
                res.status(200).send({data: "true"});
            } else {
                res.status(200).send({data: "false"})
            }
        } else {
            res.status(400).send("Pet doesn't exist")
        }
    } else {
        res.status(400).send('Not Authenticated');
    }
}