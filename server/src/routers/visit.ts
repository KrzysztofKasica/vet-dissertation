import { Router } from "express";
import { acceptVisit, cancelVisit, createVisit, getIncomingVisits, getLatestVisitByUser, getVisitByUser, getVisitHistory, getVisitRequestsByDoctor } from "../controllers/visit";

export const visitRouter = Router();

visitRouter.get('/getvisits', getVisitByUser);

visitRouter.get('/getlatestvisits', getLatestVisitByUser);

visitRouter.post('/createvisit', createVisit);

visitRouter.delete('/cancelvisit', cancelVisit);

visitRouter.get('/getvisitrequests', getVisitRequestsByDoctor);

visitRouter.patch('/acceptvisit', acceptVisit);

visitRouter.get('/getincomingvisits', getIncomingVisits);

visitRouter.get('/getvisithistory', getVisitHistory);