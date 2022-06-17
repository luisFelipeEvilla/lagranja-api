require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const DB_URI = process.env.DB_URI || 'mongodb://localhost/my_database';
const ENCRYPTION_PASSWORD = process.env.ENCRYPTION_PASSWORD  || 'FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs';

module.exports = {
    SERVER_PORT,
    DB_URI,
    ENCRYPTION_PASSWORD
}