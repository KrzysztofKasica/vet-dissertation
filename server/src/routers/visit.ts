import { Router } from "express";
import { getVisitByUser } from "../controllers/visit";

export const visitRouter = Router();

visitRouter.get('/getvisits', getVisitByUser);
