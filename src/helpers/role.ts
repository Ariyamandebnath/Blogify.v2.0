import { RoleCode } from "../models/Role.model";
import { RoleRequest } from "../types/app-request";
import { Response, NextFunction } from "express";


export default (...roleCodes: RoleCode[]) => (req: RoleRequest, res: Response, next: NextFunction) => {
    req.currentRoleCodes = roleCodes;
    next();
}