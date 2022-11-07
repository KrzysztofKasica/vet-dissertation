import { Request, Response } from "express";
import { isDoctor } from "../isDoctor";
import { isAuth } from "../isAuth";

export const auth = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        res.status(200).send({auth: true, doctor: req.session.doctor})
    } else {
        res.status(400).send({auth: false, reason: "Not Authenticated"});
    }
}

export const authDoctor = async (req: Request, res: Response) => {
    if (isAuth(req)) {
        const isDoc = await isDoctor(req);
        res.status(200).send({data: isDoc.toString()});
        return;
    } else {
        res.status(400).send({auth: false, reason: "Not Authenticated"});
    }
}