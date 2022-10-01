const express = require('express')
const router = express.Router()
const { createGoal, getGoals, updateGoal, deleteGoal } = require('../controllers/goalController')
const { protect } = require('../middleware/auth')

router.route('/').post(protect, createGoal).get(protect, getGoals)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

module.exports = router
