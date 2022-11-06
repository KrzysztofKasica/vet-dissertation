import { Request } from "express"

export const isDoctor = (req: Request) => {
    if(req.session.doctor) {
        return true;
    }
    return false;
}