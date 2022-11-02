import { Router } from "express";
import { createPet } from "../controllers/pet";

export const petRouter = Router();

petRouter.post('/createpet', createPet);