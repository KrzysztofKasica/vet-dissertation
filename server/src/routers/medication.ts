import { Router } from "express";
import { addMedication } from "../controllers/medication";

export const medicationRouter = Router();

medicationRouter.post('/addmedication', addMedication)