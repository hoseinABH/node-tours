const express = require('express');
const {
  getAllTours,
  createTour,
  deleteTour,
  updateTour,
  getTourById,
  aliasTopTours,
} = require('../controllers/tourControllers');

const router = express.Router();

// Middleware for validate tour ID
// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
