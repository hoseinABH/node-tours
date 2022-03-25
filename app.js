const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
// Initilize app
const app = express();

// Middlewares
/* Logging Requests*/
app.use(morgan('dev'));

/* Getting Request Body */
app.use(express.json());

/* Getting Request Time */
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Fake Database
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

// Handlers
/* Tours Route Handlers */
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'successful',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'successful',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'successful',
        createdAt: req.requestTime,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID',
    });
  }
};

const deleteTour = (req, res) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'successful',
    message: 'Deleted',
  });
};

/* Users Route Handlers */
const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'successful',
    results: users.length,
    data: {
      users,
    },
  });
};

const getUserById = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'successful',
    data: {
      tour,
    },
  });
};

const createUser = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'successful',
        createdAt: req.requestTime,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateUser = (req, res) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID',
    });
  }
};

const deleteUser = (req, res) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'successful',
    message: 'Deleted',
  });
};

// Routes
const tourRouter = express.Router();
const userRouter = express.Router();

/* Tours Routes */
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

/* Users Routes */
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

/* Mounting The Routers */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App Running on port: ${port}`);
});
