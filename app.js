// npm import
const express = require('express');
require('dotenv').config({ path: './src/configs/.env' });
const path = require('path');
// project file import
const routers = require('./src/routers');
const customErrorHandler = require('./src/middlewares/errors/customErrorHandler');
// db connection
require('./src/configs/dbConnection');
// app start and express middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// routers
app.use('/api', routers);
// middlewares
app.use(customErrorHandler);
//
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(PORT, ' is active'));
