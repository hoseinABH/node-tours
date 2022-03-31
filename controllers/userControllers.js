/* eslint-disable no-shadow */
const fs = require('fs');

// Fake Database
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'successful',
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUserById = (req, res) => {
  const id = +req.params.id;
  const tour = users.find((tour) => tour.id === id);
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

exports.createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  users.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users),
    () => {
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

exports.updateUser = (req, res) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID',
    });
  }
};

exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  if (id > users.length) {
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
