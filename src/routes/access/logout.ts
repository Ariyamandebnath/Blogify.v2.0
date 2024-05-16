import express from 'express';
import KeyStoreRepo from '../../repositorys/KeyStore.repo';
import { ProtectedRequest } from '../../types/app-request';
import { SuccessMsgResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import authentication from '../../auth/authentication';


const router = express.Router();



router.use(authentication);

router.delete('/',
    asyncHandler(async (req: ProtectedRequest, res) => {
        await KeyStoreRepo.remove(req.keystore._id);
        new SuccessMsgResponse('Logout success').send(res);
    }),
);

export default router;