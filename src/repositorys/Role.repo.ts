import Role, { RoleModel } from '../models/Role.model';


async function findByCode(code: string): Promise<Role | null>{
    return RoleModel.findOne({
        code: code,
        status: true
    }).lean().exec();
}


async function findByCodes(codes: string[]): Promise<Role[] >{
    return RoleModel.findOne({
        code: { $in: codes },
        status: true
    }).lean().exec();
}

export default {
    findByCode,
    findByCodes,
}