import { createLogger, transports, format } from 'winston';
import fs from "fs";
import path from "path";
import DailyRotateFile from 'winston-daily-rotate-file';
import { environment, logDirectory } from "../constants";

let dir = logDirectory;
//resolve absolute path of logs fdifining the path of the directory for storing the logs
if (!dir) dir = path.resolve('logs');

//create directory if it already doesn not exist
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const logLevels = environment === "development" ? "debug" : "warn";

const dailyRotateFile = new DailyRotateFile({
    level: logLevels,
    filename: dir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    handleExceptions: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        format.json(),
    ),
})

export default createLogger({
    transports: [
        new transports.Console({
            level: logLevels,
            format: format.combine(
                format.errors({ stack: true }),
                format.prettyPrint(),
            )
        }),
        dailyRotateFile,
    ],
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false,//dp not exit on handalled excrptions
})