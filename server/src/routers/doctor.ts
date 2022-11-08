import { Router } from "express";
import { getDoctorById, getDoctorsList } from "../controllers/doctor";

export const doctorRouter = Router();

doctorRouter.get('/getdoctorslist', getDoctorsList);

doctorRouter.get('/getdoctorbyid', getDoctorById)
