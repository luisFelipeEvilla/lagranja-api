import express from 'express';
import swaggerUi from 'swagger-ui-express'
import db from './db/index.js';
import cors from 'cors';

import users from './routes/users.js';
import suppliers from './routes/suppliers.js';
import collections from './routes/collections.js';

import auth from './middlewares/auth.js';

import { SERVER_PORT } from './config.js';
import { createRequire } from "module"

db();

const app = express();

const require = createRequire(import.meta.url)
const swaggerFile = require('./swagger-output.json');

app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/', users);
app.use('/suppliers', auth, suppliers);
app.use('/collections', collections);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(SERVER_PORT, () => {
    console.log(`Server it's listenning on port ${SERVER_PORT}`);
})

export default app;