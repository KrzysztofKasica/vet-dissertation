import { Router } from "express";
import { auth, authDoctor } from "../controllers/auth";


export const authRouter = Router();

authRouter.get('/', auth);

authRouter.get('/isdoctor', authDoctor);