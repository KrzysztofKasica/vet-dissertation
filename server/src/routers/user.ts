import { Router } from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/user";

export const userRouter = Router();

userRouter.get('/getallusers', getAllUsers);

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);