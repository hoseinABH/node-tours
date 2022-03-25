const express = require('express');
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
} = require('../controllers/userControllers');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
