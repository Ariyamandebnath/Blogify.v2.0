export const DB_NAME = "Blogify@2.0.0";
export const port = process.env.PORT;
export const environment = process.env.NODE_ENV;

export const logDirectory = process.env.LOG_DIR;

export const tokenInfo = {
    accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
    refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
    issuer: process.env.TOKEN_ISSUER || '',
    audience: process.env.TOKEN_AUDIENCE || '',
};


