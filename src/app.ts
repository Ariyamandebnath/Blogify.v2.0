import express, { Request, Response, NextFunction } from 'express';
import logger from './utils/Logger';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { CORS_ORIGIN, environment } from './constants';
import './db';
import {
    NotFoundError,
    ApiError,
    InternalError,
    ErrorType,
} from './utils/ApiError';


process.on('uncaughtException', (e) => {
    logger.error(e);
});

const app = express();


app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.use(express.json({
    limit: "10 mb"
}));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));
app.use(express.static("public "));
app.use(cookieParser());



// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
        if (err.type === ErrorType.INTERNAL)
            logger.error(
                `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
    } else {
        logger.error(
            `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
        );
    logger.error(err);
    if (environment === 'development') {
        return res.status(500).send(err);
    }
        ApiError.handle(new InternalError(), res);
    }
});

export default app;
