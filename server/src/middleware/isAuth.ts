import { Request } from "express"

export const isAuth = (req: Request) => {
    if(!req.session.userId) {
        return false;
    }
    return true;
}