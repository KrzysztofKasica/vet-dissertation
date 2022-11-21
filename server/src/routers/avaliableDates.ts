import { Router } from "express";
import { addDate, getDates } from "../controllers/avaliableDates";


export const avaliableDatesRouter = Router();

avaliableDatesRouter.post('/adddate', addDate);

avaliableDatesRouter.get('/getdates', getDates)