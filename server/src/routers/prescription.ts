import { Router } from "express";
import { addPrescription } from "../controllers/prescription";

export const prescriptionRouter = Router();

prescriptionRouter.post('/addprescription', addPrescription);

