const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

// @desc     Create goal
// @route    POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please enter a goal')
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  })
  res.status(200).json(goal)
})

// @desc     Read goals
// @route    GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

// @desc     Update goal
// @route    PUT /api/goals:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('That goal does not exist')
  }
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await (Goal.findByIdAndUpdate(req.params.id, req.body, { new: true }))

  res.status(200).json(updatedGoal)
})

// @desc     Delete goals
// @route    DELETE /api/goal/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('That goal does not exist')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  await goal.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal
}
