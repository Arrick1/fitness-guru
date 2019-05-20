const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const session = require("express-session")
const path = require('path')
require('dotenv').config()

require('./db/db')
const corsOptions = {
  origin: 'http://localhost:3001', //when you deploy your react app, this is where you adress,
  credentials: true, // allowing cookies to be sent with requests from the client (session cookie),
  optionsSuccessStatus: 200 //
}

console.log(process.env.MY_SECRET)

const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave:false,
  secret:"arrick is cool",
  saveUninitialized: false
}))

app.use('/api/exercise', apiRouter);
app.use('/users', usersRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'built', 'index.html'))
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler


module.exports = app;
