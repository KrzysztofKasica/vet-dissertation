import { Router } from "express";
import { addPrescription, getPrescriptionsByClient } from "../controllers/prescription";

export const prescriptionRouter = Router();

prescriptionRouter.post('/addprescription', addPrescription);

prescriptionRouter.get('/getprescriptionsbyclient', getPrescriptionsByClient)

