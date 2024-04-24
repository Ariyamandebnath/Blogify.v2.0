import mongoose from "mongoose";
import { db } from "../constants";
import logger from "../utils/Logger"

const dbURI =process.env.MongoDB_URI
const options = {
  autoIndex: true,
  minPoolSize: db.minPoolSize, // Maintain up to x socket connections
  maxPoolSize: db.maxPoolSize, // Maintain up to x socket connections
  connectTimeoutMS: 60000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

logger.debug(dbURI);

function setRunValidators(this: any) {
  this.setOptions({ runValidators: true });
  
}
mongoose.set('strictQuery', true);

mongoose
  .plugin((schema: any) => {
    schema.pre('findOneAndUpdate', setRunValidators);
    schema.pre('updateMany', setRunValidators);
    schema.pre('updateOne', setRunValidators);
    schema.pre('update', setRunValidators);
  })
  .connect(`${dbURI}`, options)
  .then(() => {
    logger.info('Mongoose connection done');
  })
  .catch((e) => {
    logger.info('Mongoose connection error');
    logger.error(e);
  });

//Connection Events 

//WHen successfull connected

mongoose.connection.on('connected', () => {
  logger.debug('Mongoose default connection opern to ' + dbURI);
});

//If the connction throws an error 
mongoose.connection.on('error', (err) => {
  logger.error('Mongoose default connection error :' + err);
});

//whent the connection throws an error
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected');
});

//If the node porcess ends , close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close().finally(() => {
    logger.info(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});


export const connection = mongoose.connection;