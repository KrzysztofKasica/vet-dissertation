import { Router } from "express";
import { createVisit, getVisitByUser } from "../controllers/visit";

export const visitRouter = Router();

visitRouter.get('/getvisits', getVisitByUser);

visitRouter.post('/createvisit', createVisit)