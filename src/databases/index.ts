import { logger } from '@utils/logger';

import mongoose, { ConnectOptions } from 'mongoose';

import { DB_URL } from '@config';


const mongooseOptions: ConnectOptions = {
  // Required options (provide correct connection details)
  // dbName: 'your_database_name',
  // user: 'your_username',
  // pass: 'your_password',
  // authSource: 'your_auth_source', // Optional if applicable

  // Optional options
  connectTimeoutMS: 5000, // Set connection timeout in milliseconds
  retryWrites: true, // Enable retrying writes on failure
  w: 'majority', // Set write concern (write acknowledgement strategy)
};

// connecting mongoose to remote db cluster
const DB = async () => {
  mongoose
    .connect(DB_URL, mongooseOptions)
    .then(() => {
      logger.info('Connected to MongoDB!');
    })
    .catch((err) => {
      logger.error('Error connecting to MongoDB:', err);
    });
};

export default DB;
