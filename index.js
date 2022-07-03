import express from 'express';
import db from './db/index.js';

import users from './routes/users.js';
import suppliers from './routes/suppliers.js';

import auth from './middlewares/auth.js';

import { SERVER_PORT } from './config.js';

db();

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/', users);
app.use('/suppliers', auth, suppliers);

app.listen(SERVER_PORT, () => {
    console.log(`Server it's listenning on port ${SERVER_PORT}`);
})