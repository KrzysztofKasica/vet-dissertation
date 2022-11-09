import { Router } from "express";
import { createVisit, getLatestVisitByUser, getVisitByUser } from "../controllers/visit";

export const visitRouter = Router();

visitRouter.get('/getvisits', getVisitByUser);

visitRouter.get('/getlasestvisits', getLatestVisitByUser)

visitRouter.post('/createvisit', createVisit)