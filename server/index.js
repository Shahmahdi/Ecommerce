const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const userRoutes = require('./routes/user');

// app
const app = express();

// DB
mongoose.connect(process.env.Database, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.log(`Database connected..`);
});

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/api', userRoutes);


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server is running..');
});