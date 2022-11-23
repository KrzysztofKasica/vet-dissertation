import { Router } from "express";
import { createPet, deletePet, doesPetBelongToUser, editPet, getPetById, getPetsByUser, getPetsNameListByUser } from "../controllers/pet";

export const petRouter = Router();

petRouter.post('/createpet', createPet);

petRouter.patch('/editpet', editPet);

petRouter.get('/getpets', getPetsByUser);

petRouter.get('/getpetsnamelistbyuser', getPetsNameListByUser)

petRouter.get('/getpet', getPetById);

petRouter.get('/doespetbelongtouser/:id', doesPetBelongToUser);

petRouter.delete('/deletepet', deletePet)