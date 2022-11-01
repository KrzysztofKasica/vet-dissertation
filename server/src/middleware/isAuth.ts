import { Request } from "express"

export const isAuth = (req: Request) => {
    if(!req.session.clientId) {
        return false;
    }
    return true;
}