// const express = require('express');
import express from 'express';

//import our local router file
// const routes = require('./routes/global');
import routes from './routes';

//init express app
const app = express();

//allows express to work with json
app.use(express.json());

//router
app.use(routes);

//it will export our app/express to import into server.js
// module.exports = app;
export default app;



