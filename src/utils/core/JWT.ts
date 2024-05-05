import path from "path";
import { readFile } from "fs";
import { promisify } from "util";
import { sign, verify } from "jsonwebtoken";
import { InternalError, BadTokenError, TokenExpiredError } from "./ApiError"
import { StringNullableChain } from "lodash";




/*
 * issuer 		— Software organization who issues the token.
 * subject 		— Intended user of the token.
 * audience 	— Basically identity of the intended recipient of the token.
 * expiresIn	— Expiration time after which the token will be invalid.
 * algorithm 	— Encryption algorithm to be used to protect the token.
 */


export class JwtPayload{

    aud: string;
    sub: string;
    iss: string;
    iat: number;
    exp: number;
    prm: string;


    

}
