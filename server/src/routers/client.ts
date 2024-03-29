import { Router } from "express";
import { getAllClients, loginClient, logoutClient, registerClient } from "../controllers/client";

export const clientRouter = Router();

clientRouter.get('/getallclients', getAllClients);

clientRouter.post('/register', registerClient);

clientRouter.post('/login', loginClient);

clientRouter.post('/logout', logoutClient);