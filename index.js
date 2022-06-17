const express = require('express');
const db = require('./db/index');

const signup = require('./routes/users');

const { SERVER_PORT } = require('./config');

db();

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/', signup);

app.listen(SERVER_PORT, () => {
    console.log(`Server it's listenning on port ${SERVER_PORT}`);
})