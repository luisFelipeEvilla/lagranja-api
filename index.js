const express = require('express');
const db = require('./db/index');

const users = require('./routes/users');
const suppliers = require('./routes/suppliers');

const auth = require('./middlewares/auth');

const { SERVER_PORT } = require('./config');

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