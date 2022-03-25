const express = require('express');
const {
  getAllTours,
  createTour,
  deleteTour,
  updateTour,
  getTourById,
} = require('../controllers/tourControllers');

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
