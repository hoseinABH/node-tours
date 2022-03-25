const express = require('express');
const {
  getAllTours,
  createTour,
  deleteTour,
  updateTour,
  getTourById,
  checkID,
} = require('../controllers/tourControllers');

const router = express.Router();

// Middlewar for validate tour ID
router.param('id', checkID);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
