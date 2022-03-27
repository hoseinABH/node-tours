const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      // tours,
    },
  });
};

exports.getTourById = (req, res) => {
  const id = +req.params.id;
  res.status(200).json({
    status: 'success',
    data: {
      // tour,
    },
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      createdAt: req.requestTime,
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Updated',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: 'Deleted',
  });
};
