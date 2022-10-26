import { Request, Response } from "express";
import { dataSourceConn } from "../app-data-source";
import { Client } from "../entities/Client";
import argon2 from 'argon2';
import { emailValidation, passwordValidation } from "../validation";
const clientRepository = dataSourceConn.manager.getRepository(Client);

export const getAllClients = async (req: Request, res: Response) => {
    console.log('action from user: ', req.session.clientId);
    const allClients = await clientRepository.find()
    res.send(allClients);
}

export const registerClient = async (req: Request, res: Response) => {
    if(!emailValidation(req.body.data.email)) {
        res.status(400).send('Invalid email');
    }
    else if (!passwordValidation(req.body.data.password)) {
        res.status(400).send('Password has to : be between 8-32 characters long, contain at least one number, contain at least one lowercase letter, contain at least one uppercase letter, contain at least one special character');
    }
    else {
        const newClient = new Client();
        newClient.email = req.body.data.email;
        const hashPass = await argon2.hash(req.body.data.password);
        newClient.password = hashPass;
        newClient.firstName = req.body.data.firstName;
        newClient.lastName = req.body.data.lastName;
        try {
            await dataSourceConn.manager.save(newClient);
            res.status(200).send('Client created');
        }
        catch (error){
            console.log(error);
            if (error.code == 23505){
                res.status(400).send('This email is already used');
            }
            else {
                res.status(400).send('Unknown error occured');
            }
        }
    }
}

export const loginClient = async (req: Request, res: Response) => {
    const client = await clientRepository.findOneBy({email: req.body.data.email});
    if (!client) {
        res.status(400).send('Email doesn\'t exist');
    }
    else {
        const valid = await argon2.verify(client.password, req.body.data.password);
        if (!valid) {
            res.status(400).send('Incorrect password');
        }
        else {
            req.session.clientId = client.id;
            res.status(200).send(client);
        }
    }
}