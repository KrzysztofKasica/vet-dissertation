import { Router } from "express";
import { addMedication, getMedication } from "../controllers/medication";

export const medicationRouter = Router();

medicationRouter.post('/addmedication', addMedication);

medicationRouter.get('/getmedication', getMedication);