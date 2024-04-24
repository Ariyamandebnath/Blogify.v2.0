import { Request, Response, NextFunction } from "express";

type AsyncFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

export default function asyncMiddleware(execution: AsyncFunction) {
    return function(req: Request, res: Response, next: NextFunction) {
        execution(req, res, next).catch(next);
    };
}