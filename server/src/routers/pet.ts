import { Router } from "express";
import { createPet, editPet, getPetsByUser } from "../controllers/pet";

export const petRouter = Router();

petRouter.post('/createpet', createPet);

petRouter.patch('/editpet', editPet);

petRouter.get('/getpets', getPetsByUser);