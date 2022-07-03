import mongoose from 'mongoose';
import { DB_URI } from '../config.js';

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

export default connect;