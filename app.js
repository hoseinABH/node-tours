const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Initilize app
const app = express();

// Middlewares
/* Logging Requests */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* Getting Request Body */
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

/* Getting Request Time */
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/* Mounting The Routers */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
