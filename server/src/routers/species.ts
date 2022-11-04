import { Router } from "express";
import { getSpecies } from "../controllers/species";

export const speciesRouter = Router();

speciesRouter.get('/getspecies', getSpecies);
