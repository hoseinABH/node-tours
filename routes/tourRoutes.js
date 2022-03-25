const express = require('express');
const {
  getAllTours,
  createTour,
  deleteTour,
  updateTour,
  getTourById,
  checkID,
  checkBody,
} = require('../controllers/tourControllers');

const router = express.Router();

// Middlewar for validate tour ID
router.param('id', checkID);

router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
