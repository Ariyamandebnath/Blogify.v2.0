import User, { UserModel } from '../db/models/User.model';
import { RoleModel } from '../db/models/Role.model';
import { InternalError, } from '../utils/core/ApiError';
import { Types } from 'mongoose';
import Keystore from '../db/models/Keystore.modele';
import KeyStore from './KeyStore.controller'


async function exists(id: Types.ObjectId): Promise<boolean> {
    const user = await UserModel.exists({ _id: id, status: true });
    return user !== null && user !== undefined;
}


async function findPrivateProfileById(id: Types.ObjectId,): Promise<User | null>{
    return UserModel.findOne({
        _id: id,
        status: true
    })
        .select('+email')
        .populate({
            path: 'role',
            match: { status: true },
            select: { code: 1 },
        })
        .lean<User>()
        .exec();
    
}

async function findById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true })
    .select('+email +password +roles')
    .populate({
        path: 'roles',
        match: { status: true },
    })
    .lean()
    .exec();
}


async function findByEmail(email: string): Promise<User | null>{
    return UserModel.findOne({
        email: email
    })
        .select(
            '+email +password +roles +gender +dob +grade +country +state +city +school +city +bio +hobbies',
        )
        .populate({
            path: 'roles',
            match: { status: true },
            select: { code: 1 }
        })
        .lean()
        .exec();
    
}


async function findFieldsById(
    id: Types.ObjectId,
    ...fields: string[]
): Promise<User | null>{
    return UserModel.findOne({
        _id: id,
        status: true
    }, [...fields])
        .lean()
        .exec();
}

async function findPublicProfileById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true }).lean().exec();
}

async function create(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
    roleCode: string,
): Promise<{ user: User; keystore: Keystore }>{
    const now = new Date();

    const role = await RoleModel.findOne({
        code: roleCode
    })
    .select('+code')
    .lean()
        .exec()
    
    if (!role) throw new InternalError('Role must be defined');

    user.roles = [role];
    user.createdAt = user.updatedAt = now;
    const createdUser = await UserModel.create(user);
    const keystore = await KeyStore.create(
        createdUser,
        accessTokenKey,
        refreshTokenKey,

    );

    return {
        user: {
            ...createdUser.toObject(), roles: user.roles
        },
        keystore: keystore,
    };
    
}

async function update(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
): Promise<{ user: User; keystore: Keystore }> {
    user.updatedAt = new Date();
    await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
        .lean()
        .exec();
    const keystore = await KeyStore.create(
        user,
        accessTokenKey,
        refreshTokenKey,
    );
    return { user: user, keystore: keystore };
}

async function updateInfo(user: User): Promise<any> {
    user.updatedAt = new Date();
    return UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
        .lean()
        .exec();
}

export default {
    exists,
    findPrivateProfileById,
    findById,
    findByEmail,
    findFieldsById,
    findPublicProfileById,
    create,
    update,
    updateInfo,
};
