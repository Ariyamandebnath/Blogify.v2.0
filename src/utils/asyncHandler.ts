import { Request, Response, NextFunction } from "express";

type AsycFunction =(
    req: Request,
    res: Response,
    next: NextFunction;
) => Promise<any>;


export default (execution:AsycFunction) {
    (req: Request, res: Response, next:NextFunction){
        execution(req,res,next).catch(next)
    }

}