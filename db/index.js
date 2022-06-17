const mongoose = require('mongoose');
const { DB_URI } = require('../config');

const connect = () => {
    mongoose.connect(DB_URI, {
        
    },(err) => {
        if (err) {
            console.error(`Database connection error \n ${err}`);
            process.exit(1)
        }
        console.log('Database connection suscessfully stablished');
    })
}

module.exports = connect;