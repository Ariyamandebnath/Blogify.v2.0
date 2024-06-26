import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { RoleRequest } from '../../types/app-request';
import UserRepo from '../../repositorys/User.repo';
import { BadRequestError } from '../../core/ApiError';
import User from '../../models/User.model';
import validator from '../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { RoleCode } from '../../models/Role.model';
import role from '../../helpers/role';
import authorization from '../../auth/authorization';
import authentication from '../../auth/authentication';
import KeystoreRepo from '../../repositorys/ApiKey.repo';

const router = express.Router();

//----------------------------------------------------------------
router.use(authentication, role(RoleCode.ADMIN), authorization);
//----------------------------------------------------------------

router.post(
  '/user/assign',
  validator(schema.credential),
  asyncHandler(async (req: RoleRequest, res) => {
    const user = await UserRepo.findByEmail(req.body.email);
    if (!user) throw new BadRequestError('User do not exists');

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    await UserRepo.updateInfo({
      _id: user._id,
      password: passwordHash,
    } as User);

    await KeystoreRepo.removeAllForClient(user);

    new SuccessResponse(
      'User password updated',
      _.pick(user, ['_id', 'name', 'email']),
    ).send(res);
  }),
);

export default router;
