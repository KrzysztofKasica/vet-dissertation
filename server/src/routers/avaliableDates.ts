import { Router } from "express";
import { addDate } from "../controllers/avaliableDates";


export const avaliableDatesRouter = Router();

avaliableDatesRouter.post('/adddate', addDate);

