import { config} from 'dotenv'

config();
 
export const SERVER_PORT = process.env.SERVER_PORT || 3000;
export const DB_URI = process.env.DB_URI || 'mongodb://localhost/my_database';
export const ENCRYPTION_PASSWORD = process.env.ENCRYPTION_PASSWORD  || 'FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs';
export const SERVER_BASE_URL =  process.env.SERVER_BASE_URL || 'http://localhost';

export const jwtSecret = process.env.jwt_secret || 'secret';