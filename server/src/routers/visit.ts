import { Router } from "express";
import { cancelVisit, createVisit, getLatestVisitByUser, getVisitByUser } from "../controllers/visit";

export const visitRouter = Router();

visitRouter.get('/getvisits', getVisitByUser);

visitRouter.get('/getlatestvisits', getLatestVisitByUser);

visitRouter.post('/createvisit', createVisit);

visitRouter.delete('/cancelvisit', cancelVisit);