import { Router } from "express";
import { getAllClients, loginClient, registerClient } from "../controllers/client";

export const clientRouter = Router();

clientRouter.get('/getallclients', getAllClients);

clientRouter.post('/register', registerClient);

clientRouter.post('/login', loginClient);