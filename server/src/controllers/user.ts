import { Request, Response } from "express";
import { dataSourceConn } from "../app-data-source";
import { User } from "../entities/User";
import argon2 from 'argon2';
import { emailValidation, passwordValidation } from "../validation";
const userRepository = dataSourceConn.manager.getRepository(User);

export const getAllUsers = async (req: Request, res: Response) => {
    console.log('action from user: ', req.session.userId);
    const allUsers = await userRepository.find()
    res.send(allUsers);
}

export const registerUser = async (req: Request, res: Response) => {
    if(!emailValidation(req.body.email)) {
        res.status(400).send('Invalid email');
    }
    else if (!passwordValidation(req.body.password)) {
        res.status(400).send('Password has to : be between 8-32 characters long, contain at least one number, contain at least one lowercase letter, contain at least one uppercase letter, contain at least one special character');
    }
    else {
        const newUser = new User();
        newUser.email = req.body.email;
        const hashPass = await argon2.hash(req.body.password);
        newUser.password = hashPass;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        try {
            await dataSourceConn.manager.save(newUser);
            res.status(200).send('User created');
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

export const loginUser = async (req: Request, res: Response) => {
    const user = await userRepository.findOneBy({email: req.body.email});
    if (!user) {
        res.status(400).send('Email doesn\'t exist');
    }
    else {
        const valid = await argon2.verify(user.password, req.body.password);
        if (!valid) {
            res.status(400).send('Incorrect password');
        }
        else {
            req.session.userId = user.id;
            res.status(200).send(user);
        }
    }
}