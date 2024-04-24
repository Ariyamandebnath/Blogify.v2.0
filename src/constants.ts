export const port = process.env.PORT;
export const environment = process.env.NODE_ENV;

export const logDirectory = process.env.LOG_DIR;

export const CORS_ORIGIN = process.env.CORS_ORIGIN;

export const db = {
    DB_NAME : process.env.DB_NAME,
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
};


export const tokenInfo = {
    accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
    refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
    issuer: process.env.TOKEN_ISSUER || '',
    audience: process.env.TOKEN_AUDIENCE || '',
};


