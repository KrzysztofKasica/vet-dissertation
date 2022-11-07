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
    console.log('got req')
    console.log(req)
    if (isAuth(req)) {
        const isDoc = await isDoctor(req);
        res.status(200).send({data: isDoc.toString()});
        console.log('jest git', isAuth(req))
        return;
    } else {
        console.log('jest chij')
        res.status(400).send({auth: false, reason: "Not Authenticated"});
    }
    console.log(isAuth(req))
}